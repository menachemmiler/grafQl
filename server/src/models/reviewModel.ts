import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  id?: string;
  rating: number;
  content: string;
  isLiked: boolean;
  isDisliked: boolean;
  gameId: string; // מזהה המשחק שאליו שייכת הביקורת
  authorId: string; // מזהה המחבר שכתב את הביקורת
}

const ReviewSchema = new Schema<IReview>({
  rating: { type: Number, default: 0 },
  content: { type: String, required: true },
  gameId: { type: String, required: true }, // מזהה המשחק שאליו שייכת הביקורת
  authorId: { type: String, required: true }, // מזהה המחבר שכתב את הביקורת
  isLiked: { type: Boolean, default: false },
  isDisliked: { type: Boolean, default: false },
});

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
