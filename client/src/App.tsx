import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Nav from "./components/Nav.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import NewAdventure from "./pages/NewAdventure.tsx";
import { setContext } from "@apollo/client/link/context";
import Adventure from "./pages/Adventure.tsx";

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
       <Router>
        <Nav/>
        <div className="container">
          <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/adventure" element={<NewAdventure />} />
              <Route path="/adventure/:id" element={<Adventure/>} />
          </Routes>
          </div>
        </Router>
    </ApolloProvider>
  );
}

export default App;
