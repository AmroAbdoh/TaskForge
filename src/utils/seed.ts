import type { User, Project, Task } from "../types/domain";

export const users: User[] = [
  {
    id: "u1",
    email: "amro@test.com",
    name: "Amro",
    // projectIds: ["p1", "p2"],
    password: "12345678",
  },
  {
    id: "u2",
    email: "test@test.com",
    name: "test",
    // projectIds: ["p2", "p3"],
    password: "11223344",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Personal Website",
    description: "Build portfolio site",

    ownerID: "u1",
    
    accessUserIds: ["u1"],
  },
  {
    id: "p2",
    title: "TaskForge App",
    description: "Frontend project",
    ownerID: "u1",
    
    accessUserIds: ["u1", "u2"],
  },
  {
    id: "p3",
    title: "Marketing Plan",
    description: "Campaign planning",

    ownerID: "u2",
    
    accessUserIds: ["u2"],
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    projectId: "p1",
    title: "Front-end",
    status:"to-do",
    dueDate:"2026-03-03",
  },
  {
    id: "2",
    projectId: "p1",
    title: "Back-end",
    status:"in progress",
    dueDate:"2026-06-02"
  },
  {
    id: "3",
    projectId: "p2",
    title: "HTML",
    status:"Done",
    dueDate:"2026-07-02"
  },
  {
    id: "4",
    projectId: "p2",
    title: "CSS",
    status:"in progress",
    dueDate:"2026-08-02"
  },
  {
    id: "5",
    projectId: "p2",
    title: "JS",
    status:"to-do",
    dueDate:"2026-09-02"
  },
];
