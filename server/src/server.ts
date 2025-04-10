import express from 'express';
import db from './config/connection.js';
import { authMiddleware } from './utils/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the ApolloServer class
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {

  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => authMiddleware({ req }),
    })
  );

// Serve frontend static files
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Fallback to index.html for non-API routes (like React Router paths)
app.get('*', (req, res) => {
  if (!req.originalUrl.startsWith('/graphql')) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  }
});


  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
