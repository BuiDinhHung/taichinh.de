export type DbArticle = {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  status: "published";
  createdAt: number;
  updatedAt: number;
};

export type DbArticleInput = {
  id?: string;
  title: string;
  content: string;
  category: string;
};

export type DbUser = {
  username: string;
  passwordHash: string;
  createdAt: number;
  updatedAt: number;
};
