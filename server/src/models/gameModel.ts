import mongoose, { Schema, Document } from "mongoose";
import { IReview } from "./reviewModel";



export interface IGame extends Document {
  id?: string;
  title: string;
  platform: string[];
  reviews: string[]; // מערך של מזהי ביקורות
}

const GameSchema = new Schema<IGame>({
  title: {type: String, required: true},
  platform: {type: [String]},
  reviews: {type: [String], default: []}
})

export const Game = mongoose.model<IGame>("Game", GameSchema);
