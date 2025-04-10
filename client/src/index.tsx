// src/index.tsx
//import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define your GraphQL endpoint URI
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Use setContext to attach token from localStorage, if present.
const authLink = setContext((_, { headers }): { headers: Record<string, string> } => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo client instance.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Create the root element and render the application.
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
