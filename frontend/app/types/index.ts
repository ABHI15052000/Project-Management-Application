export interface User {
  _id: string;
  email: string;
  name: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  lastLogin?: string;          // Date in ISO format
  is2FAEnabled: boolean;
  createdAt: string;           // timestamps
  updatedAt: string;
}
