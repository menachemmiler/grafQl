import { Game, IGame } from "../models/gameModel";
import { IReview, Review } from "../models/reviewModel";
import { Author, IAuthor } from "../models/authorModel";
import { db } from "../data";

// מגדירים את ה-resolvers שהם בעצם פונקציות שמבצעות את הלוגיקה עבור השאילתות והמוטציות ב-GraphQL
export const resolvers = {
  // אובייקט Query - מכיל שאילתות שמחזירות מידע
  Query: {
    // מחזיר את כל המשחקים
    games: async () => {
      try {
        const allgames = await Game.find({});
        // if(!al)
        console.log({ allgames });
        return allgames;
      } catch (error: any) {
        return [];
      }
    },
    // מחזיר את כל המחברים
    authors: async () => {
      try {
        const allAouthors = await Author.find({});
        return allAouthors;
      } catch (error: any) {
        return [];
      }
    },
    // מחזיר את כל הביקורות
    reviews: async () => {
      try {
        const allReviews = await Review.find({});
        if (!allReviews) throw new Error("con't get all reviews");
        return allReviews;
      } catch (error: any) {
        return [];
      }
    },
    // מחזיר משחק לפי מזהה
    game: async (_: any, args: IGame) => {
      try {
        const game = await Game.findById(args.id);
        if (!game) throw new Error("Game not found with this ID");
        return game;
      } catch (error: any) {
        return error.message; // מחזיר את הודעת השגיאה במידה ויש בעיה
      }
    },
    // מחזיר מחבר לפי מזהה
    author: async (_: any, args: IAuthor) => {
      try {
        const author = await Author.findById(args.id);
        if (!author) throw new Error("Author not found with this ID");
        return author;
      } catch (error: any) {
        return error.message;
      }
    },
    // מחזיר ביקורת לפי מזהה
    review: async (_: any, args: IReview) => {
      try {
        const review = await Review.findById(args.id);
        if (!review) throw new Error("Review not found with this ID");
        return review;
      } catch (error: any) {
        return error.message;
      }
    },
  },
  // מקשרים בין אובייקט Game לאובייקטים קשורים
  Game: {
    // מחזיר את כל הביקורות של משחק ספציפי
    reviews: async (parent: IGame) => {
      try {
        return await Review.find({ gameId: parent.id });
      } catch (error) {
        return [];
      }
    },
  },
  // מקשרים בין אובייקט Author לאובייקטים קשורים
  Author: {
    // מחזיר את כל הביקורות של מחבר ספציפי
    reviews: async (parent: IAuthor) => {
      try {
        const reviews = await Review.find({ authorId: parent.id });
        return reviews;
      } catch (error: any) {
        return error.message;
      }
    },
  },
  // מקשרים בין אובייקט Review לאובייקטים קשורים
  Review: {
    // מחזיר את המחבר שכתב את הביקורת
    author: async (parent: IReview) => {
      try {
        return await Author.findById(parent.authorId);
      } catch (error) {
        return null;
      }
    },
    // מחזיר את המשחק אליו שייכת הביקורת
    game: async (parent: IReview) => {
      try {
        return await Game.findById(parent.gameId);
      } catch (error) {
        return null;
      }
    },
  },
  // אובייקט Mutation - מכיל פעולות שמשנות נתונים
  Mutation: {
    // מאתחל את המערכת על ידי מחיקת כל הנתונים הקיימים
    async seed(_: any) {
      console.log("seed");
      await Game.deleteMany({});
      await Review.deleteMany({});
      await Author.deleteMany({});
      const allgames = db.games;
      const allreviews = db.reviews;
      const allauthors = db.authors;
      const games = await Game.insertMany(allgames);
      const authors = await Author.insertMany(allauthors);
      allreviews.map(async (review) => {
        const newReview = await Review.create({...review, gameId: games[0].id, authorId: authors[0].id});
        await newReview.save();
      })
      return await Game.find({});
    },
    // מוחק משחק לפי מזהה
    async deleteGame(_: any, args: { id: string }) {
      await Game.findByIdAndDelete(args.id);
      await Review.deleteMany({ gameId: args.id });
      return Game.find({});
    },
    // מוחק ביקורת לפי מזהה
    async deleteReview(_: any, args: { id: string }) {
      await Review.findByIdAndDelete(args.id);
      return Review.find({});
    },
    // מוחק מחבר לפי מזהה
    async deleteAuthor(_: any, args: { id: string }) {
      await Author.findByIdAndDelete(args.id);
      await Review.deleteMany({ authorId: args.id });
      return Author.find({});
    },
    //הוספת משחק
    async addGame(_: any, args: IGame) {
      const game = await Game.create(args);
      return game;
    },
    // הוספת ביקורת
    async addReview(_: any, args: IReview) {
      const review = await Review.create(args);
      await review.save();
      await Game.findByIdAndUpdate(args.gameId, { $push: { reviews: review.id } });
      return review;
    },
    // הוספת מחבר
    async addAuthor(_: any, args: IAuthor) {
      const author = await Author.create(args);
      return author;
    },
  },
};
