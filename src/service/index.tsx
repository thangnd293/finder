import { apiProvider } from '@/api-graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apiCaller = apiProvider(
  new ApolloClient({
    uri: 'https://finder-gold.vercel.app/graphql',
    cache: new InMemoryCache(),
  }),
);
