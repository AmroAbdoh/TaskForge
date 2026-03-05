export interface User {
  id: string;
  email: string;
  name: string;
  // projectIds: string[];
  password: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;

  ownerID:string;
  memberIds:string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status : "to-do" | "Done" | "in progress";
  dueDate : string;
}
