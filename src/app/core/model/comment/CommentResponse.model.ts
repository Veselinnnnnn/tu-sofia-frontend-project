export interface CommentResponseModel {
  id: number;
  userId: number;
  animalId: number;
  content: string;
  username: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  rating: number;
  currentUserReactionType: string;
}

