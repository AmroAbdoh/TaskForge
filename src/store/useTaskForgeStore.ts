// useTaskForgeStore.ts
import { create } from "zustand";
import type { User, Project, Task } from "../types/domain";
import { users, projects as projectsSeed , tasks} from "../utils/seed";
import { saveToStorage, loadFromStorage } from "../utils/persist";

interface TaskForgeState {
  currentUser: User | null;
  projects: Project[];
  users: User[];
  tasks: Task[];

  login: (email: string, password: string) => boolean;
  logout: () => void;
  addProject: (title: string, description: string, memberIds: string[]) => void;

  deleteProject: (projectId: string) => void;
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
}

const storedProjects = loadFromStorage<Project[]>("projects");
const storedTasks = loadFromStorage<Task[]>("tasks");

export const useTaskForgeStore = create<TaskForgeState>((set) => ({
  currentUser: null,
  projects: storedProjects ?? projectsSeed,
  users,
  tasks : storedTasks ?? tasks,

  login: (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) return false;

    set({ currentUser: user });

    return true;
  },

  logout: () => set({ currentUser: null }),

  addProject: (title, description, memberIds) =>
    set((state) => {
      if (!state.currentUser) return state;

      const ownerId = state.currentUser.id;
      const newProject: Project = {
        id: crypto.randomUUID(),
        title,
        description,
        ownerID: ownerId,
        memberIds: Array.from(new Set([...memberIds, ownerId])),
      };

      const updatedProjects = [...state.projects, newProject];

      saveToStorage("projects", updatedProjects);

      return {
        ...state,
        projects: updatedProjects,
      };
    }),

  deleteProject: (projectId) =>
    set((state) => {
      const updatedProjects = state.projects.filter((p) => p.id !== projectId);

      saveToStorage("projects", updatedProjects);
      
      const updatedTasks = state.tasks.filter( (t) => t.projectId !== projectId );
      
      saveToStorage("tasks", updatedTasks);


      return {
        ...state,
        projects: updatedProjects,
        tasks:updatedTasks,
      };
    }),

  addTask: (task: Task) =>
  set((state) => {
    const updatedTasks = [...state.tasks, task];

    saveToStorage("tasks", updatedTasks);

    return {
      tasks: updatedTasks,
    };
  }),
  updateTaskStatus: (taskId, status) =>
  set((state) => {
    const updatedTasks = state.tasks.map((t) =>
      t.id === taskId ? { ...t, status } : t
    );

    saveToStorage("tasks", updatedTasks);

    return { tasks: updatedTasks };
  }),
}));
