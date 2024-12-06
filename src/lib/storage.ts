import type { Project } from '@/types/project';

const STORAGE_KEY = 'projects';

// Create a custom event for project updates
const PROJECT_UPDATED_EVENT = 'projectsUpdated';

export const storage = {
  getProjects: (): Project[] => {
    const projects = localStorage.getItem(STORAGE_KEY);
    return projects ? JSON.parse(projects) : [];
  },

  getProject: (id: string): Project | undefined => {
    const projects = storage.getProjects();
    return projects.find(project => project.id === id);
  },

  saveProject: (project: Project): void => {
    const projects = storage.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    
    if (index !== -1) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    // Dispatch event to notify about the update
    window.dispatchEvent(new Event(PROJECT_UPDATED_EVENT));
  },

  deleteProject: (id: string): void => {
    const projects = storage.getProjects();
    const filteredProjects = projects.filter(project => project.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProjects));
    window.dispatchEvent(new Event(PROJECT_UPDATED_EVENT));
  },

  importProject: (projectData: Project): void => {
    const project = {
      ...projectData,
      id: crypto.randomUUID(), // Generate new ID to avoid conflicts
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.saveProject(project);
  },

  exportProject: (id: string): string => {
    const project = storage.getProject(id);
    if (!project) throw new Error('Project not found');
    return JSON.stringify(project, null, 2);
  }
};