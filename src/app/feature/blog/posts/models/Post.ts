export interface Post {
  id: string;
  title: string;
  description?: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  comments: any[];
}
