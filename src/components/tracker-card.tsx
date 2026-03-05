import Link from 'next/link';
import { Project } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Activity, Clock } from 'lucide-react';

export function TrackerCard({ project }: { project: Project }) {
    const healthColors: Record<string, string> = {
        Green: "bg-emerald-50 text-emerald-800 border-emerald-200",
        Yellow: "bg-amber-50 text-amber-800 border-amber-200",
        Red: "bg-rose-50 text-rose-800 border-rose-200"
    };

    const badgeStyle = healthColors[project.current_health] || healthColors.Green;

    return (
        <Link href={`/project/${project.id}`}>
            <Card className="hover:shadow-xl hover:border-accent/40 transition-all duration-300 border-border bg-card group cursor-pointer h-full flex flex-col">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl font-serif text-primary leading-tight">
                            {project.name}
                        </CardTitle>
                        <Badge variant="outline" className={`${badgeStyle} ml-2 font-medium`}>
                            <Activity className="w-3 h-3 mr-1" />
                            {project.current_health}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Progress</span>
                            <span className="text-sm font-semibold text-primary">{project.overall_progress}%</span>
                        </div>
                        <Progress value={project.overall_progress} className="h-2" />
                    </div>

                    <div className="mt-auto space-y-4">
                        {project.accomplishments.length > 0 && (
                            <div className="bg-muted p-4 rounded-md border border-border/50 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                                <p className="text-sm text-muted-foreground italic line-clamp-2">
                                    "{project.accomplishments[project.accomplishments.length - 1]}"
                                </p>
                            </div>
                        )}

                        <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border/50">
                            <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(project.last_update_timestamp).toLocaleDateString()}
                            </div>
                            <span className="text-primary group-hover:text-accent group-hover:translate-x-1 transition-all flex items-center uppercase tracking-wider font-semibold">
                                View Roadmap <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
