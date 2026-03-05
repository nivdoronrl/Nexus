import { getProject } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleDashed, Activity, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    const healthColors: Record<string, string> = {
        Green: "bg-emerald-50 text-emerald-800 border-emerald-200",
        Yellow: "bg-amber-50 text-amber-800 border-amber-200",
        Red: "bg-rose-50 text-rose-800 border-rose-200"
    };

    const badgeStyle = healthColors[project.current_health] || healthColors.Green;

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/40 bg-card py-6 sticky top-0 z-10">
                <div className="container mx-auto px-6 max-w-5xl flex items-center">
                    <Link href="/" className="text-muted-foreground hover:text-accent transition-colors mr-6 group flex items-center">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-serif text-primary tracking-tight">{project.name}</h1>
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-1">Architecture Roadmap</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-1">Last Synthesized</span>
                            <div className="flex items-center text-sm font-medium text-foreground">
                                <Calendar className="w-4 h-4 mr-1 text-accent" />
                                {new Date(project.last_update_timestamp).toLocaleDateString()}
                            </div>
                        </div>
                        <Badge variant="outline" className={`${badgeStyle} px-3 py-1 font-medium text-sm`}>
                            <Activity className="w-4 h-4 mr-2" />
                            {project.current_health}
                        </Badge>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 max-w-5xl py-12">
                <div className="mb-12 bg-card border border-border/50 p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Global Completion</span>
                        <span className="text-lg font-serif text-primary">{project.overall_progress}%</span>
                    </div>
                    <Progress value={project.overall_progress} className="h-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Past Accomplishments */}
                    <div>
                        <h2 className="text-2xl font-serif text-primary mb-6 flex items-center border-b border-border/50 pb-3">
                            <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                            Accomplished Archive
                        </h2>
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent hidden">
                            {/* Visual timeline line for larger screens - omitted for simplified Polo aesthetic */}
                        </div>
                        <div className="space-y-4">
                            {project.accomplishments.length === 0 && (
                                <p className="text-muted-foreground italic">No past accomplishments recorded.</p>
                            )}
                            {project.accomplishments.map((item, idx) => (
                                <div key={idx} className="flex items-start group">
                                    <div className="mt-1 flex-shrink-0 bg-background border border-border p-1 rounded-full group-hover:border-accent transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                                    </div>
                                    <div className="ml-4 p-4 bg-muted/30 border border-border/50 rounded-md w-full text-foreground group-hover:shadow-sm transition-all leading-relaxed">
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Steps */}
                    <div>
                        <h2 className="text-2xl font-serif text-primary mb-6 flex items-center border-b border-border/50 pb-3">
                            <span className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                            Upcoming Trajectory
                        </h2>
                        <div className="space-y-4">
                            {project.upcoming_steps.length === 0 && (
                                <p className="text-muted-foreground italic">No upcoming steps synthesized.</p>
                            )}
                            {project.upcoming_steps.map((item, idx) => (
                                <div key={idx} className="flex items-start group">
                                    <div className="mt-1 flex-shrink-0 bg-background p-1 rounded-full border border-transparent">
                                        <CircleDashed className="w-5 h-5 text-accent animate-pulse-slow" />
                                    </div>
                                    <div className="ml-4 p-4 border-l-2 border-accent/50 bg-card rounded-r-md w-full text-foreground group-hover:bg-muted/10 transition-colors leading-relaxed">
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
