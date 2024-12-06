import { PageHeader } from '@/components/layout/PageHeader';
import { ProjectList } from '@/components/projects/ProjectList';

export function ProjectsOverview() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Project Manager"
        description="Manage your project specifications efficiently"
      />
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto py-8">
          <ProjectList />
        </div>
      </main>
    </div>
  );
}