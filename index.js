import { ApolloServer } from "@apollo/server"; 
import { startStandaloneServer } from "@apollo/server/standalone";
import { games, authors, reviews } from "./_db.js";
import { typeDefs } from "./schema.js";
//Server setup

const resolvers = {
    Query: {
        games(){
            return games;
        },

        game(_, args){
            return games.find(game => game.id === args.id);
        },

        authors(){
            return authors;
        },

        author(_, args){
            return authors.find(author => author.id === args.id);
        },

        reviews(){
            return reviews;
        },

        review(_, args){
            return reviews.find(review => review.id === args.id);
        }
    }
}

/* 
query getGames{
  games {
    title
  }
}
*/

const server = new ApolloServer({
    //typeDefs -- schema --> Definitions of different types of data we want to expose on our server
    // schema -- describes the shape of data sets
    typeDefs,
    //Resolver functions -- resolvers property
    resolvers
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log("Server ready at port", 4000);