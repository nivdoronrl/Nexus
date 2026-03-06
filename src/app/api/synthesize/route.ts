import { NextResponse } from "next/server";
import { AzureOpenAI } from "openai";
import { GoogleGenAI } from "@google/genai";
import { revalidatePath } from "next/cache";
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

        const azureKey = process.env.AZURE_OPENAI_API_KEY;
        const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

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

        console.log("AI Prompt Sent:", prompt.substring(0, 500) + "...");

        let responseText = "";
        let usedModel = "";

        if (azureKey && azureEndpoint && azureDeployment) {
            console.log("Using Azure OpenAI (Microsoft Copilot)...");
            const client = new AzureOpenAI({
                apiKey: azureKey,
                endpoint: azureEndpoint,
                apiVersion: "2024-05-01-preview",
                deployment: azureDeployment,
            });

            const response = await client.chat.completions.create({
                model: azureDeployment,
                messages: [
                    { role: "system", content: "You are the Nexus Track AI engine. Return only valid JSON." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            });

            responseText = response.choices[0].message.content || "";
            usedModel = "Azure/Copilot";
        } else {
            console.log("Azure credentials missing, falling back to Gemini...");
            const geminiKey = process.env.GEMINI_API_KEY;
            if (!geminiKey) {
                return NextResponse.json({ error: "No AI credentials configured (Gemini or Azure)" }, { status: 500 });
            }

            const genAI = new GoogleGenAI({ apiKey: geminiKey });
            const result = await genAI.models.generateContent({
                model: "gemini-flash-latest",
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                config: { responseMimeType: "application/json" }
            });

            const part = result.candidates?.[0]?.content?.parts?.[0];
            if (!part || !part.text) {
                return NextResponse.json({ error: "Gemini response missing text" }, { status: 500 });
            }
            responseText = part.text.replace(/```json/g, '').replace(/```/g, '').trim();
            usedModel = "Gemini";
        }

        if (!responseText) {
            return NextResponse.json({ error: "AI response empty" }, { status: 500 });
        }
        console.log(`AI RESPONSE (${usedModel}):`, responseText);

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

            // Robust progress parsing
            let parsedProgress = 0;
            if (typeof update.overall_progress === 'number') {
                parsedProgress = update.overall_progress;
            } else if (typeof update.overall_progress === 'string') {
                // Handle cases like "75%", "~75%", "approx 75"
                const match = update.overall_progress.match(/(\d+)/);
                if (match) {
                    parsedProgress = parseInt(match[1]);
                }
            }

            if (parsedProgress === 0 && existing) {
                parsedProgress = existing.overall_progress;
            }

            const updatePayload = {
                name: update.project_name,
                accomplishments: uniqueAccomplishments,
                upcoming_steps: update.upcoming_steps || [],
                current_health: update.project_health || "Green",
                overall_progress: Math.min(100, Math.max(0, parsedProgress)),
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
            if (adminDb) {
                revalidatePath(`/project/${update.project_id}`);
            }
        }

        // --- NEW: Global Ingestion Log ---
        if (adminDb) {
            await adminDb.collection("ingestion_logs").add({
                timestamp: new Date().toISOString(),
                raw_text: pasted_update.substring(0, 10000), // Cap size
                projects_detected: processed,
                status: "Success",
                ai_model: usedModel
            });
        }
        // --------------------------------

        revalidatePath('/');
        return NextResponse.json({ success: true, count: processed.length, projects: processed });

    } catch (error: any) {
        console.error("Synthesize API Error:", error);

        if (error.status === 429 || error.message?.includes("429") || error.message?.includes("quota")) {
            return NextResponse.json({
                error: "Gemini API rate limit exceeded. Please try again in a few minutes or tomorrow (Free Tier limited to 20 requests/day)."
            }, { status: 429 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
