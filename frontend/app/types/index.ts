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
  members: Array<User | string>;
}
