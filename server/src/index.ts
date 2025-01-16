// זו הספרייה שמאפשרת לנו להקים שרת GraphQL
import { ApolloServer } from "@apollo/server";
// מייבאים כלי שעוזר לנו להפעיל שרת באופן עצמאי ופשוט
import { startStandaloneServer } from "@apollo/server/standalone";

//ייבוא המבנה של הנתונים במערכת
import { typeDefs } from "./schema/typeDefs";
//ייבוא הפונקצייות שמטפלות בבקשות של הלקוח
import { resolvers } from "./resolvers/resolvers"

import "dotenv/config";
import { conectToMongo } from "./config/db";

const PORT = process.env.PORT;

console.log({PORT})

conectToMongo();
async function startServer() {
  // יוצרים שרת Apollo חדש
  // בתוך הסוגריים המסולסלות נעביר שני דברים חשובים:
  // typeDefs - זה המקום שבו נגדיר את המבנה של הנתונים שלנו כמו תכנון של טבלאות;
  // resolvers - זה המקום שבו נכתוב את הפונקציות שמטפלות בבקשות שמגיעות מהלקוח
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  // מפעילים את השרת
  // הפונקציה הזו מחזירה לנו את הכתובת שבה השרת זמין
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(PORT as string) },
  });
  console.log(`🚀 Server ready at: ${url}`);
}

 
startServer();
