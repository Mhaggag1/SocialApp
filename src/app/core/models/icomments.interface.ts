export interface Icomments {
  _id: string;
  image: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: null;
  likes: any[];
  content?: string;
  createdAt: string;
  repliesCount: number;
}

interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
