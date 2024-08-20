import { ApolloServer } from "@apollo/server"; 
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
//Server setup

const server = new ApolloServer({
    //typeDefs -- schema --> Definitions of different types of data we want to expose on our server
    // schema -- describes the shape of data sets
    typeDefs,
    //Resolver functions -- resolvers property
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log("Server ready at port", 4000);