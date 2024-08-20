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
            return games.find((game) => game.id === args.id);
        },

        authors(){
            return authors;
        },

        author(_, args){
            return authors.find((author) => author.id === args.id);
            
        },

        reviews(){
            return reviews;
        },

        review(_, args){
            return reviews.find((review) => review.id === args.id);
        }
    },

    Game: {
        reviews(parent) {
            return reviews.filter(review => review.game_id === parent.id)
        }
    },

    Author: {
        reviews(parent){
            return reviews.filter(review => review.author_id === parent.id);
        }
    },

    Review: {
        author(parent){
            return authors.find(author => author.id === parent.author_id);
        },

        game(parent){
            return games.find(game => game.id === parent.game_id);
        }
    },

    Mutation: {
        deleteGame(_, {id}){
                games = games.filter(game => game.id !== id);
                return games
        },

        deleteAuthor(_, {id}){
            authors = authors.filter(author => author.id !== id);
        },

        deleteReview(_, {id}){
            reviews = reviews.filter(review => review.id !== id);
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