const PROJECTS_KEY = 'genforge_projects';
const API_KEY_KEY = 'genforge_gemini_key';

export const storage = {
  getProjects: () => JSON.parse(localStorage.getItem(PROJECTS_KEY)) || [],
  
  saveProjects: (projects) => localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects)),
  
  getProject: (id) => storage.getProjects().find(p => p.id === id),
  
  saveProject: (project) => {
    const projects = storage.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) projects[index] = project;
    else projects.push(project);
    storage.saveProjects(projects);
  },
  
  deleteProject: (id) => {
    const projects = storage.getProjects().filter(p => p.id !== id);
    storage.saveProjects(projects);
  },

  getApiKey: () => localStorage.getItem(API_KEY_KEY) || '',
  setApiKey: (key) => localStorage.setItem(API_KEY_KEY, key)
};
