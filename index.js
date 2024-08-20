import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
//Server setup

export let games = [
    {
        id: "1",
        title: "The Last Adventure",
        platform: ["PC", "PlayStation 5"]
    },
    {
        id: "2",
        title: "Mystic Quest",
        platform: ["Xbox Series X", "PC"]
    },
    {
        id: "3",
        title: "Racing Mania",
        platform: ["Nintendo Switch", "PlayStation 4"]
    },
    {
        id: "4",
        title: "Battlefront Heroes",
        platform: ["PC", "PlayStation 5", "Xbox Series X"]
    },
    {
        id: "5",
        title: "Fantasy World",
        platform: ["PlayStation 4", "Nintendo Switch"]
    }
];


export let authors = [
    {
        id: "1",
        name: "John Doe",
        verified: true
    },
    {
        id: "2",
        name: "Jane Smith",
        verified: false
    },
    {
        id: "3",
        name: "Emily Johnson",
        verified: true
    },
];

export let reviews = [
    {
        id: "1",
        rating: "8",
        content: "Great gameplay and visuals, but the story could be better.",
        author_id: "1",
        game_id: "3"
    },
    {
        id: "2",
        rating: "9",
        content: "An amazing experience with an intriguing plot and superb mechanics.",
        author_id: "3",
        game_id: "1"
    },
    {
        id: "3",
        rating: "7",
        content: "Solid game, but lacks innovation in certain aspects.",
        author_id: "2",
        game_id: "2"
    },
    {
        id: "4",
        rating: "6",
        content: "Decent for casual play, but not very engaging overall.",
        author_id: "4",
        game_id: "5"
    },
    {
        id: "5",
        rating: "10",
        content: "Absolutely loved it! A masterpiece in every sense.",
        author_id: "1",
        game_id: "4"
    },
    {
        id: "6",
        rating: "8",
        content: "Fun and challenging with great replay value.",
        author_id: "5",
        game_id: "3"
    },
    {
        id: "7",
        rating: "7",
        content: "Good game, but has a few bugs that need fixing.",
        author_id: "3",
        game_id: "2"
    }
];



const resolvers = {
    Query: {
        games() {
            return games;
        },

        game(_, args) {
            return games.find((game) => game.id === args.id);
        },

        authors() {
            return authors;
        },

        author(_, args) {
            return authors.find((author) => author.id === args.id);

        },

        reviews() {
            return reviews;
        },

        review(_, args) {
            return reviews.find((review) => review.id === args.id);
        }
    },

    Game: {
        reviews(parent) {
            return reviews.filter(review => review.game_id === parent.id)
        }
    },

    Author: {
        reviews(parent) {
            return reviews.filter(review => review.author_id === parent.id);
        }
    },

    Review: {
        author(parent) {
            return authors.find(author => author.id === parent.author_id);
        },

        game(parent) {
            return games.find(game => game.id === parent.game_id);
        }
    },

    Mutation: {
        addGame(_, {game}){
            const newGame = {...game, id: Math.floor(Math.random() * 10000) }
            console.log(newGame);
            games.push(newGame);
            return newGame;
        },

        deleteGame(_, { id }) {
            games = games.filter((game) => game.id !== id);
            return games;
        },

        updateGame(_, {id, edits}){
            games = games.map(game => game.id === id ? {...game, ...edits} : game);
            const updatedGame = games.find(game => game.id === id);
            return updatedGame;
        },

        deleteAuthor(_, { id }) {
            authors = authors.filter((author) => author.id !== id);
            return authors;
        },

        deleteReview(_, { id }) {
            reviews = reviews.filter((review) => review.id !== id);
            return reviews;
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

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log("Server ready at port", 4000);