import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import type { Project } from '@/types/project';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';

export function ImportProject() {
  const navigate = useNavigate();
  const [isImporting, setIsImporting] = useState(false);
  const { notifyProjectUpdate } = useProjects();

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const projectData = JSON.parse(text) as Project;
      storage.importProject(projectData);
      notifyProjectUpdate();
      navigate('/');
    } catch (error) {
      console.error('Failed to import project:', error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Button variant="outline" asChild>
      <label className="cursor-pointer">
        <Upload className="w-4 h-4 mr-2" />
        Import Project
        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
          disabled={isImporting}
        />
      </label>
    </Button>
  );
}