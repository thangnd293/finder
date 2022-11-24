import { apiProvider } from '@/api-graphql';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { useUserStore } from '../store/user';

const httpLink = createHttpLink({
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

export const apiCaller = apiProvider(
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  }),
);
