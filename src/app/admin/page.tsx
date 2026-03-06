import { getIngestionLogs } from "@/lib/data";
import { Clock, History, FileText, LayoutDashboard, Database, Cpu } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const logs = await getIngestionLogs();

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/40 bg-card py-6 sticky top-0 z-10">
                <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                            <LayoutDashboard className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-serif text-primary tracking-tight">Audit Log</h1>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        <Database className="w-4 h-4" />
                        <span>System Activity</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-5xl py-12">
                <div className="mb-10 flex items-center justify-between border-b border-border/50 pb-6">
                    <div>
                        <h2 className="text-3xl font-serif text-primary">Ingestion History</h2>
                        <p className="text-muted-foreground mt-1">A timeline of all unstructured data processed by the Nexus AI engine.</p>
                    </div>
                    <div className="bg-accent/10 border border-accent/20 px-4 py-2 rounded-md flex items-center space-x-2">
                        <History className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-accent">{logs.length} Total recorded events</span>
                    </div>
                </div>

                <div className="space-y-8">
                    {logs.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
                            <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-muted-foreground italic">No ingestion logs found in the archives.</p>
                        </div>
                    )}

                    {logs.map((log) => (
                        <div key={log.id} className="group relative bg-card border border-border/50 rounded-xl p-6 hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-primary/5 p-2 rounded-lg">
                                            <FileText className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Raw Payload Log</span>
                                            <span className="text-sm font-medium text-foreground">
                                                {new Date(log.timestamp).toLocaleString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 border border-border/40 p-4 rounded-lg">
                                        <p className="text-sm font-mono text-muted-foreground line-clamp-4 whitespace-pre-wrap leading-relaxed">
                                            {log.raw_text}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {log.projects_detected.map((projId: string) => (
                                            <Link key={projId} href={`/project/${projId}`}>
                                                <Badge variant="outline" className="bg-background hover:bg-accent/5 hover:text-accent hover:border-accent transition-colors cursor-pointer">
                                                    {projId}
                                                </Badge>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="md:text-right flex flex-col items-start md:items-end justify-between min-w-[140px]">
                                    <Badge className="bg-black text-white px-3 py-1 font-medium text-xs mb-2">
                                        {log.status}
                                    </Badge>
                                    <div className="mt-auto pt-4 border-t border-border/30 w-full md:w-auto flex items-center justify-end space-x-2 text-muted-foreground">
                                        <Cpu className="w-4 h-4" />
                                        <span className="text-xs font-semibold uppercase tracking-widest">{log.ai_model || "Dual-AI"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
