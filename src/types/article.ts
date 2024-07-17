export interface ArticleListResponse {
  data: {
    posts: ArticleList;
  };
  message: string;
}

export type ArticleList = Article[];

export interface Article {
  id: number;
  title: string;
  description: string;
  author: Author;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  status: string;
}

export interface Author {
  nickname: string;
  rank: number;
}
