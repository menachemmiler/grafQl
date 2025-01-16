export const typeDefs = `#graphql
type Game {
id: ID!
title: String!
platform: [String!]!
reviews: [Review!]!
}
type Review {
id: ID!
rating: Int!
content: String!
game: Game!
author: Author!
isLiked: Boolean!
isDisliked: Boolean!
}
type Author {
id: ID!
name: String!
verified: Boolean!
reviews: [Review!]!
}
type Query {
reviews: [Review]
games: [Game]
authors: [Author]
review(id: ID!): Review
game(id: ID!): Game
author(id: ID!): Author
authorByName(name: String!): Author
}
type Mutation {
seed: [Game]
deleteGame(id: ID!): [Game]
deleteReview(id: ID!): [Review]
deleteAuthor(id: ID!): [Author]
addGame(title: String!, platform: [String!]!): Game
addAuthor(name: String!): Author
addReview(rating: Int!, content: String!, gameId: ID!, authorId: ID!, isLiked: Boolean, isDisliked: Boolean): Review
}
`;
