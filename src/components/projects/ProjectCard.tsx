import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ProjectActions } from '@/components/projects/ProjectActions';
import { formatDate } from '@/lib/utils';
import type { Project } from '@/types/project';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col">
      <div 
        className="flex-1 cursor-pointer"
        onClick={() => navigate(`/project/${project.id}`)}
      >
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Created:</span>
              <span>{new Date(project.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Updated:</span>
              <span>{new Date(project.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="border-t pt-4">
        <ProjectActions projectId={project.id} projectName={project.name} />
      </CardFooter>
    </Card>
  );
}