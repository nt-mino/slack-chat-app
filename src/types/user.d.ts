export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
};
export type Users = User[];
