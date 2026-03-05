import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { adminDb } from "@/lib/firebase-admin";
import { mockStore } from "@/lib/mock-store";
import { Project } from "@/types";

export async function POST(req: Request) {
    try {
        const { pasted_update } = await req.json();

        if (!pasted_update) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let allProjects: Project[] = [];

        if (adminDb) {
            const snapshot = await adminDb.collection('projects').get();
            allProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        } else {
            allProjects = mockStore.getProjects();
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
        }

        const genAI = new GoogleGenAI({ apiKey });

        const prompt = `
      You are the "Nexus Track" AI engine. Your task is to analyze the following UPDATE TEXT and extract structured data for EVERY project mentioned.
      
      UPDATE TEXT TO ANALYZE:
      """
      ${pasted_update}
      """

      EXISTING PROJECTS:
      ${allProjects.map(p => `- ID: ${p.id}, Name: ${p.name}`).join('\n')}

      INSTRUCTIONS:
      1. Identify projects by name or context.
      2. If a project matches an existing one (even partially/by name), use its ID.
      3. If a project is new, generate a valid kebab-case ID (e.g., "bio-stretch").
      4. For each project, extract:
         - project_name: The full official name.
         - new_milestones: Array of NEW accomplishments found in THIS update text only.
         - upcoming_steps: Array of next 3 critical steps.
         - project_health: "Green", "Yellow", or "Red".
         - overall_progress: The percentage (0-100). Look for "Estimated % complete" labels.
      
      Respond only with JSON in this format:
      {
        "updates": [
          {
            "project_id": "string",
            "project_name": "string",
            "new_milestones": ["string"],
            "upcoming_steps": ["bullet1", "bullet2"],
            "project_health": "Green",
            "overall_progress": 70
          }
        ]
      }
    `;

        const result = await genAI.models.generateContent({
            model: "gemini-flash-latest",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json"
            }
        });

        if (!result.candidates || result.candidates.length === 0) {
            return NextResponse.json({ error: "No AI candidates returned" }, { status: 500 });
        }

        const part = result.candidates?.[0]?.content?.parts?.[0];
        if (!part || !part.text) {
            return NextResponse.json({ error: "AI response missing text part" }, { status: 500 });
        }

        const responseText = part.text.replace(/```json/g, '').replace(/```/g, '').trim();
        console.log("GEMINI RAW RESPONSE:", responseText);

        let synthesized;
        try {
            synthesized = JSON.parse(responseText) as { updates: any[] };
        } catch (e) {
            console.error("JSON Parse Error. Response was:", responseText);
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

        const processed = [];
        for (const update of synthesized.updates) {
            // Find existing project to preserve history
            const existing = allProjects.find(p => p.id === update.project_id);
            const oldAccomplishments = existing?.accomplishments || [];

            // Merge and deduplicate
            const combined = [...(update.new_milestones || []), ...oldAccomplishments];
            const uniqueAccomplishments = Array.from(new Set(combined));

            const updatePayload = {
                name: update.project_name,
                accomplishments: uniqueAccomplishments,
                upcoming_steps: update.upcoming_steps || [],
                current_health: update.project_health || "Green",
                overall_progress: typeof update.overall_progress === 'number' ? update.overall_progress : (existing?.overall_progress || 0),
                last_update_timestamp: new Date().toISOString()
            };

            if (adminDb) {
                const projRef = adminDb.collection("projects").doc(update.project_id);
                await projRef.set(updatePayload, { merge: true });

                // Save raw update reference
                await projRef.collection("raw_updates").add({
                    raw_text: pasted_update.substring(0, 5000),
                    timestamp: new Date().toISOString()
                });
            } else {
                mockStore.updateProject(update.project_id, updatePayload);
            }
            processed.push(update.project_id);
        }

        return NextResponse.json({ success: true, count: processed.length, projects: processed });

    } catch (error) {
        console.error("Synthesize API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
