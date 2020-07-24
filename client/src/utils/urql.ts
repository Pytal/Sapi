import { createClient, defaultExchanges, subscriptionExchange } from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { SubscriptionClient } from 'subscriptions-transport-ws'

export const initClient = (token: string) => createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: {
    headers: { Authorization: `Bearer ${token}` }
  },
  maskTypename: true,
  exchanges: [
    devtoolsExchange,
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (op) => new SubscriptionClient(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT.replace( 'https', 'wss' ),
        {
          reconnect: true,
          connectionParams: {
            headers: { Authorization: `Bearer ${token}` }
          }
        }
      ).request(op)
    })
  ]
})
