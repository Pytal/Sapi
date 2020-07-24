import { initAuth0 } from '@auth0/nextjs-auth0'

export const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: process.env.AUTH0_SCOPE,
  redirectUri: process.env.AUTH0_REDIRECT,
  postLogoutRedirectUri: process.env.AUTH0_LOGOUT_REDIRECT,
  session: {
    cookieSecret: process.env.AUTH0_SESSION_COOKIE_SECRET,
    cookieSameSite: 'strict',
    cookieLifetime: 60*60*8,
    storeIdToken: true,
    storeAccessToken: false,
    storeRefreshToken: false
  },
  oidcClient: {
    httpTimeout: 3000,
    clockTolerance: 10000
  }
})
