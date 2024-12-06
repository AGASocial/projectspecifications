import { useNavigate, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { storage } from '@/lib/storage';
import type { Project } from '@/types/project';
import { Save } from 'lucide-react';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const projectData = storage.getProject(id);
    if (projectData) {
      setProject(projectData);
      setName(projectData.name);
      setDescription(projectData.description);
      setSpecifications(projectData.specifications);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleSave = () => {
    if (!project || !name.trim()) return;
    setIsSaving(true);
    
    try {
      const updatedProject: Project = {
        ...project,
        name,
        description,
        specifications,
        updatedAt: new Date().toISOString(),
      };
      
      storage.saveProject(updatedProject);
      setProject(updatedProject);
    } finally {
      setIsSaving(false);
    }
  };

  if (!project) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title={project.name}
        description="Edit project details and specifications"
      />
      <main className="flex-1 bg-muted/30 flex flex-col">
        <div className="container mx-auto flex-1 p-4 md:p-6 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <BackButton />
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

          <Card className="flex-1 flex flex-col overflow-hidden">
            <Tabs defaultValue="details" className="flex-1 flex flex-col">
              <div className="border-b px-4 md:px-6">
                <TabsList className="h-14 w-full justify-start gap-6">
                  <TabsTrigger 
                    value="details"
                    className="relative h-full data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <div className="flex items-center gap-2">
                      <span>Project Details</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary/0 transition-all data-[state=active]:bg-primary/100" />
                  </TabsTrigger>
                  <TabsTrigger 
                    value="specifications"
                    className="relative h-full data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <div className="flex items-center gap-2">
                      <span>Technical Specifications</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary/0 transition-all data-[state=active]:bg-primary/100" />
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent 
                value="details" 
                className="flex-1 overflow-auto p-4 md:p-6"
              >
                <div className="h-full max-w-4xl mx-auto flex flex-col gap-4 md:gap-6">
                  <div>
                    <Label htmlFor="name" className="text-base mb-2 block">
                      Project Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 md:h-12"
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                  <div className="flex-1 min-h-0">
                    <Label htmlFor="description" className="text-base mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter project description"
                      className="h-[calc(100%-2rem)] min-h-[200px] resize-none"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent 
                value="specifications" 
                className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col"
              >
                <Label className="text-base mb-2 block">
                  Technical Specifications
                </Label>
                <div className="flex-1 h-[calc(100%-2rem)] [&_.w-md-editor]:!h-full [&_.w-md-editor]:!flex [&_.w-md-editor]:!flex-col [&_.w-md-editor-content]:!flex-1 [&_.w-md-editor-content]:!h-full [&_.w-md-editor-preview]:!h-full [&_.w-md-editor-area]:!h-full [&_.w-md-editor-input]:!h-full">
                  <MDEditor
                    value={specifications}
                    onChange={(value?: string) => setSpecifications(value || '')}
                    preview="live"
                    className="!border-none !h-full"
                    hideToolbar={false}
                    visibleDragbar={false}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
}