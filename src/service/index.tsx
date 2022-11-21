import { apiProvider } from '@/api-graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apiCaller = apiProvider(
  new ApolloClient({
    uri: 'https://7a4b-42-114-100-127.ap.ngrok.io/graphql',
    cache: new InMemoryCache(),
  }),
);
