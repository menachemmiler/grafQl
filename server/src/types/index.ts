import { db } from "../data";

// טיפוס של Parent תלוי בהקשר
type Parent = any;

// ממשק עבור הפרמטרים שמועברים בשאילתה
interface Args {
  id: string; // הפרמטר המועבר בשאילתה
}

// ממשק עבור ההקשר של ה-resolver
interface Context {
  // כאן נוכל להוסיף מידע שזמין לכל ה-resolvers
  db?: typeof db;
  user?: {
    id: string;
    role: string;
  };
}

// ה-resolver עצמו עם הטיפוסים המתאימים
const reviewResolver = (_: Parent, args: Args, context?: Context) => {
  if (!context?.db) {
    throw new Error("Database not available in context.");
  }

  return context.db.reviews.find((review: any) => review.id === args.id);
};
