// src/App.tsx
import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Adventure from './components/Adventure';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// Layout component which includes a navigation bar and container for child routes
const Layout: React.FC = () => {
  return (
    <div className="flex-column justify-flex-start min-100-vh">
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/signup">Signup</Link> |{' '}
        <Link to="/adventure">Adventure</Link>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="adventure" element={<Adventure />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
