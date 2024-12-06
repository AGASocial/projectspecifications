import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { storage } from '@/lib/storage';
import type { Project } from '@/types/project';

interface CreateProjectFormProps {
  onSuccess: () => void;
}

export function CreateProjectForm({ onSuccess }: CreateProjectFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const now = new Date().toISOString();
      const project: Project = {
        id: crypto.randomUUID(),
        name,
        description,
        specifications: '',
        createdAt: now,
        updatedAt: now,
      };

      storage.saveProject(project);
      setName('');
      setDescription('');
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[200px] resize-none"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={isSubmitting}
          >
            <Plus className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Creating Project...' : 'Create Project'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}