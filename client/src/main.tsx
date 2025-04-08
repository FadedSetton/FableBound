import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import App from './App'
import Home from './pages/Home'
import SingleThought from './pages/SingleThought'
import Error from './pages/Error'
import Login from './pages/Login'
import Signup from './pages/Signup'
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
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/new-adventure',
        element: <NewAdventure />,
      },
      {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
);
}
