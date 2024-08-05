export interface ArticleListResponse {
  data: {
    posts: ArticleList;
    last: boolean;
  };
  message: string;
}

export type ArticleList = Article[];

export interface Article {
  id: number;
  title: string;
  description: string;
  author: Author;
  meetingLocation: string;
  sido?: string;
  sgg?: string;
  emd?: string;
  x?: number;
  y?: number;
  maxParticipants: number;
  currentParticipants: number;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  status: string;
  participationApplicationStatus?: string;
}

export interface Author {
  nickname: string;
  rank: number | null;
  profileImageS3SavedURL?: string;
  description?: string;
}

export interface SearchParams {
  location: string;
  status: string | null;
  sort: string | null;
}

export interface ArticleRequest {
  pageParam: number | null;
  status: string | null;
  sort: string | null;
}

export interface NewArticle {
  title: string;
  description: string;
  meetingLocation: string;
  sido: string;
  sgg: string;
  emd: string;
  x: string;
  y: string;
  maxParticipants: number;
  startDateTime: string;
  endDateTime: string;
}

export interface ParticipantInfo {
  id: number;
  rank: number | null;
  nickname: string;
  profileImageS3SavedURL: string | null;
}
