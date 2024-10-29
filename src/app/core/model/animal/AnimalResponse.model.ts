import { CommentResponseModel } from '../comment/CommentResponse.model';

export interface AnimalResponseModel {
  id: number;
  name: string;
  type: string;
  availability: boolean;
  breed: string;
  age: number;
  description: string;
  slogan: string;
  rating: number;
  img: string;
  userId: number;
  comments: CommentResponseModel[];
}
