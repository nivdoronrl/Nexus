import { getProjects } from "@/lib/data";
import { TrackerCard } from "@/components/tracker-card";
import { IngestionHub } from "@/components/ingestion-hub";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card py-6 sticky top-0 z-10">
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-serif text-primary tracking-tight">Nexus Track</h1>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-1">Intelligence & Architecture</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Active Projects Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <h2 className="text-2xl font-serif text-primary">Active Directives</h2>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                {projects.length} Portfolios
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <TrackerCard key={project.id} project={project} />
              ))}
              {projects.length === 0 && (
                <div className="col-span-2 text-center py-12 border border-dashed border-border text-muted-foreground bg-muted/20">
                  <p className="font-serif text-lg">No active projects configured.</p>
                </div>
              )}
            </div>
          </div>

          {/* Ingestion Hub Column */}
          <div className="lg:col-span-4 sticky top-32 self-start h-[calc(100vh-8rem)]">
            <IngestionHub projects={projects} />
          </div>

        </div>
      </main>
    </div>
  );
}
