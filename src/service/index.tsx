import { apiProvider } from '@/api-graphql';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import { useUserStore } from '../store/user';

const httpLink = createUploadLink({
  uri: 'https://finder-gold.vercel.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = useUserStore.getState().accessToken;
  console.log(`token: Bearer ${token}`);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const apiCaller = apiProvider(graphqlClient);
