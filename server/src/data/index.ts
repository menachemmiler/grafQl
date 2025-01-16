import { IAuthor } from "../models/authorModel";
import { IGame } from "../models/gameModel";
import { IReview } from "../models/reviewModel";


export const db: {
  games: {}[];
  reviews: {}[];
  authors: {name: string}[];
} = {
  games: [
    {
      title: "The Legend of Zelda",
      platform: ["Nintendo Switch"],
      reviews: [], // מזהי ביקורות יתווספו כאן בעת יצירת קשרים
    },
    {
      title: "Cyberpunk 2077",
      platform: ["PC", "PS5", "Xbox Series X"],
      reviews: [],
    },
    {
      title: "Elden Ring",
      platform: ["PC", "PS5", "Xbox Series X"],
      reviews: [],
    },
  ],
  reviews: [
    {
      rating: 5,
      content: "Amazing game! Highly recommend.",
      gameId: "game1", // מזהה דמה
      authorId: "author1", // מזהה דמה
      isLiked: true,
      isDisliked: false,
    },
    {
      rating: 3,
      content: "It was okay, nothing special.",
      gameId: "game2", // מזהה דמה
      authorId: "author2", // מזהה דמה
      isLiked: false,
      isDisliked: false,
    },
    {
      rating: 1,
      content: "Terrible experience. Not worth it.",
      gameId: "game3", // מזהה דמה
      authorId: "author3", // מזהה דמה
      isLiked: false,
      isDisliked: true,
    },
  ],
  authors: [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Alice Johnson" },
  ],

};
