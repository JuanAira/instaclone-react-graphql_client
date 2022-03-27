import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import client from './config/apollo';
import Auth from './pages/Auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(undefined);

  return (
    <ApolloProvider client={client}>
      {!isAuthenticated ? <Auth /> : <div>Loading...</div>}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}
