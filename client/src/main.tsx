import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import App from './App'
import Home from './pages/Home'
import Error from './pages/Error'
import NewAdventure from './pages/NewAdventure'

// set graphql API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// attachs token to every request
const authLink = setContext((_, { headers}) =>{
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
  }
  }
})

// create apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// React Router setup

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/new-adventure',
        element: <NewAdventure />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <App/>,
);
}
