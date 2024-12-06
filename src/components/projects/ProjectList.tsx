import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { ImportProject } from '@/components/projects/ImportProject';
import { useProjects } from '@/hooks/useProjects';

export function ProjectList() {
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="flex gap-3">
          <ImportProject />
          <Button onClick={() => navigate('/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </div>
      </div>
      
      {projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Get started by creating your first project or importing an existing one"
          action={
            <div className="flex gap-3">
              <ImportProject />
              <Button variant="outline" onClick={() => navigate('/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Create your first project
              </Button>
            </div>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}