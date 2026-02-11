export type Tag = {
  id: string;
  name: string;
};

export type Notes = {
  title: string;
  content: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  tags: Tag[];
  isActive: boolean;
};
