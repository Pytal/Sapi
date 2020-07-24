import { GraphQLClient } from 'graphql-request'

export const initClient = (token: string) => new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  {
    headers: { Authorization: `Bearer ${token}` }
  }
)
