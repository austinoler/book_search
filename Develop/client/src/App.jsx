import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Set your GraphQL endpoint here
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}> {/* Wrap your component tree with ApolloProvider */}
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
