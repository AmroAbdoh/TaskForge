import { create } from "zustand";
import type { Project, Task } from "../types/domain";
// import { projects as projectsSeed , tasks as tasksSeed } from "../utils/seed";
import { saveToStorage, loadFromStorage } from "../utils/persist";
import seed from "../utils/seed.json"

interface ProjectState {
  projects: Project[];
  tasks: Task[];

  addProject: (
    title: string,
    description: string,
    
    accessUserIds: string[],
    ownerId: string
  ) => void;
  
  deleteProject: (projectId: string) => void;

  addTask: (task: Task) => void;

  updateTaskStatus: (taskId: string, status: Task["status"]) => void;

}

const storedProjects = loadFromStorage<Project[]>("projects");
const storedTasks = loadFromStorage<Task[]>("tasks");

const projectsSeed : Project[]  = seed.projects;
const tasksSeed : Task[]  = seed.tasks as Task[];

const useProjectStore = create<ProjectState>((set) => ({ 

    projects: storedProjects ?? projectsSeed,
    tasks: storedTasks ?? tasksSeed,

    addProject: (title, description, accessUserIds, ownerId) =>
    set((state) => {
      const newProject: Project = {
        id: crypto.randomUUID(),
        title,
        description,
        ownerID: ownerId,
        accessUserIds: Array.from(new Set([...accessUserIds, ownerId])),
      };

      const updatedProjects = [...state.projects, newProject];
      saveToStorage("projects", updatedProjects);

      return { projects: updatedProjects };
    }),




    deleteProject: (projectId) =>
    set((state) => {
      const updatedProjects = state.projects.filter(
        (p) => p.id !== projectId
      );
      const updatedTasks = state.tasks.filter(
        (t) => t.projectId !== projectId
      );

      saveToStorage("projects", updatedProjects);
      saveToStorage("tasks", updatedTasks);

      return {
        projects: updatedProjects,
        tasks: updatedTasks,
      };
    }),

    
    addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      saveToStorage("tasks", updatedTasks);
      return { tasks: updatedTasks };
    }),


    updateTaskStatus: (taskId, status) =>
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === taskId ? { ...t, status } : t
      );

      saveToStorage("tasks", updatedTasks);
      return { tasks: updatedTasks };
    }),


}))

export default useProjectStore;