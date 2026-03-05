"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";

import { Project } from "@/types";

interface IngestionHubProps {
    projects: Project[];
}

export function IngestionHub({ projects }: IngestionHubProps) {
    const [updateText, setUpdateText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleProcessUpdate = async () => {
        if (!updateText.trim()) return;
        setLoading(true);

        try {
            const response = await fetch("/api/synthesize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pasted_update: updateText,
                }),
            });

            if (response.ok) {
                setUpdateText("");
                router.refresh(); // Refresh the page to show new data
            } else {
                console.error("Failed to process update");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-border bg-card shadow-sm h-full">
            <CardHeader className="border-b border-border/50 pb-6 bg-muted/30">
                <CardTitle className="text-xl font-serif text-primary flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-accent" />
                    Ingestion Hub
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                    Paste unstructured Copilot or team updates here. Our AI engine will detect the addressed architecture domains and synthesize the roadmap automatically.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 flex flex-col flex-1">

                <div className="space-y-2 flex-1 flex flex-col">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Global Activity Log</label>
                    <Textarea
                        className="flex-1 min-h-[200px] resize-none bg-background border-border font-sans focus-visible:ring-accent"
                        placeholder="e.g., 'Nexus Track Alpha: Finished mapping routing endpoints. Next step is user auth. \n\n Q3 Campaign: Finalized the brochure mockups...'"
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                        disabled={loading}
                    />
                </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-border/50 bg-muted/30">
                <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md h-12 text-sm uppercase tracking-wider transition-all"
                    onClick={handleProcessUpdate}
                    disabled={loading || !updateText.trim()}
                >
                    {loading ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Synthesizing Update...</>
                    ) : (
                        "Process Global Update"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
