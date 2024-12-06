import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';
import type { Project } from '@/types/project';

// Create a custom event for project updates
const PROJECT_UPDATED_EVENT = 'projectsUpdated';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from storage
  const loadProjects = useCallback(() => {
    setProjects(storage.getProjects());
  }, []);

  // Listen for project updates
  useEffect(() => {
    loadProjects();
    
    // Add event listener for project updates
    window.addEventListener(PROJECT_UPDATED_EVENT, loadProjects);
    
    return () => {
      window.removeEventListener(PROJECT_UPDATED_EVENT, loadProjects);
    };
  }, [loadProjects]);

  // Function to notify about project updates
  const notifyProjectUpdate = useCallback(() => {
    window.dispatchEvent(new Event(PROJECT_UPDATED_EVENT));
  }, []);

  return { 
    projects,
    loadProjects,
    notifyProjectUpdate
  };
}