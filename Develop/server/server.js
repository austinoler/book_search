const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schemas/typeDefs'); // Importing typeDefs
const { resolvers } = require('./schemas/resolvers'); // Importing resolvers
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer() {
  console.log('Before calling startApolloServer'); // Adding a console log to check if this part is executed
  console.log('typeDefs:', typeDefs); // Adding a console log to check the value of typeDefs
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });

  await server.start();

  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();



