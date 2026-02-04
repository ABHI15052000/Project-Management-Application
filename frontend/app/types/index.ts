export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;           // timestamps
  isEmailVerified: boolean;
  lastLogin?: Date;          // Date in ISO format
  is2FAEnabled: boolean;
  updatedAt: Date;
  profilePicture?: string;
}

export interface Workspace {
  _id: string;
  name: string;
  color: string;
  description?: string;
  owner: User | string;
  createdAt: Date;
  updatedAt: Date;
  members: {
    _id: string;
    user: User;
    role: "admin" | "member" | "owner" | "viewer";
    joinedAt: Date;
  }[];
}

export enum ProjectStatus {
  PLANNING = "Planning",
  INPROGRESS = "In Progress",
  ONHOLD = "On Hold",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  workspace: Workspace ;
  startDate: Date;
  dueDate: Date;
  progress: number; 
  task: Task[];
  members: {
    user: User;
    role: "admin" | "member" | "owner" | "viewer";
  }[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export interface SubTask {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  project: Project | string;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  dueDate?: Date;
  priority?: TaskPriority;
  assignee: User |string;
  createdBy: User | string;
  assignees: User[];
  subTasks: SubTask[];
  watchers?: User[];
  attachments?: Attachment[];
}

export interface Attachment {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number; 
  uploadedAt: Date;
  uploadedBy: User | string;
  _id: string;
}
