import { PageHeader } from '@/components/layout/PageHeader';
import { CreateProjectForm } from '@/components/projects/CreateProjectForm';
import { BackButton } from '@/components/shared/BackButton';
import { useNavigate } from 'react-router-dom';

export function CreateProject() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Create New Project"
        description="Add a new project to your portfolio"
      />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
              <p className="text-muted-foreground">
                Fill in the information below to create your new project. All fields are required.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-medium">Tips for a Great Project</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use a clear and descriptive name</li>
                <li>• Provide detailed information about the project scope</li>
                <li>• Include key objectives and goals</li>
                <li>• Mention important deadlines or milestones</li>
              </ul>
            </div>
          </div>
          <div>
            <CreateProjectForm onSuccess={() => navigate('/')} />
          </div>
        </div>
      </main>
    </div>
  );
}