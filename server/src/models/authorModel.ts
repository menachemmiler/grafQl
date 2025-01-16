import mongoose, { Schema, Document } from "mongoose";




export interface IAuthor extends Document {
    id?: string;
    name: string;
}

const AuthorSchema = new Schema<IAuthor>({
    name: {type: String, required: true},
})

export const Author = mongoose.model<IAuthor>("Author", AuthorSchema);
