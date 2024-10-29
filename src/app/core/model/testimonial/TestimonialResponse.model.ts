import { UserResponseModel } from '../user/UserResponse.model';

export interface TestimonialResponseModel {
  id: string; // Unique identifier for the testimonial
  message: string; // The testimonial message
  createdAt: Date; // Timestamp when the testimonial was created
  userId: string;
  user?: UserResponseModel;
}
