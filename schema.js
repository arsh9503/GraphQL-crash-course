export const typeDefs = `#graphql 
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        addGame(game: AddGameInput!): Game
        deleteGame(id: ID!): [Game]
        deleteReview(id: ID!): [Review]
        deleteAuthor(id: ID!): [Author]
    }

    input AddGameInput {
        title: String!,
        platform: [String!]!
    }
`

//int, float, string, boolean, ID --> key for data objects
// $ is used to declare the variable 
/*
query getGames($id: ID!){
  review(id: $id) {
    rating,
   content
  }
}
*/