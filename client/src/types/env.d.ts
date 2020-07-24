export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH0_DOMAIN: string
      AUTH0_CLIENT_ID: string
      AUTH0_CLIENT_SECRET: string
      AUTH0_SCOPE: string
      AUTH0_REDIRECT: string
      AUTH0_LOGOUT_REDIRECT: string
      AUTH0_SESSION_COOKIE_SECRET: string
      NEXT_PUBLIC_GRAPHQL_ENDPOINT: string
      NEXT_PUBLIC_GOOGLE_MAPS_APIKEY: string
    }
  }
}
