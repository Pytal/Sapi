import { Meta } from '../components/Meta'
import { NavBar } from '../components/NavBar'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { initClient } from '../utils/urql'
import { app } from '../styled'
import { logo } from '../svg'
import type { AppProps } from 'next/app'
import type { Client as UrqlClient } from 'urql'

const RecoilRoot = dynamic(async () => (await import('recoil')).RecoilRoot, { ssr: false } )
const UrqlProvider = dynamic(async () => (await import('urql')).Provider, { ssr: false } )
const App = dynamic(async () => (await import('../components/App')).App, { ssr: false } )

interface UserStatus {
  isAuthenticated: boolean
  hasProfile: boolean
  token: string
  profileID: number
}


export default (appProps: AppProps) => {
  const { Component, pageProps, router } = appProps
  const { route } = router

  const [userStatus, setUserStatus] = useState<null|UserStatus>(null)
  const [client, setClient] = useState<null|UrqlClient>(null)


  useEffect(() => {(async _ => {
    if (!userStatus) {
      const { isAuthenticated, hasProfile, token, profileID } = await api.get( 'auth-profile-token' )
      // console.log({ isAuthenticated, hasProfile })

      setUserStatus({ isAuthenticated, hasProfile, token, profileID })
    }
    else {
      const { isAuthenticated, hasProfile, token } = userStatus

      if (route === '/' && isAuthenticated) {
        if (hasProfile) router.push( '/app/home' )
        else router.push( '/signup' )
      }
      else if ( route.includes('/app') ) {
        if (!isAuthenticated) router.push( '/' )
        else if (!client) setClient( initClient(token) )
      }
    }
  })()}, [userStatus,route,client])


  return (
    <>
    <Meta />
    <RecoilRoot>
    {client ?
      <UrqlProvider value={client}>
        {userStatus?.profileID ?
          <App {...appProps} profileID={userStatus.profileID} />
          :
          <app.loadingPage>
            <logo.primary as={app.loadingLogo} />
          </app.loadingPage>
        }
      </UrqlProvider>
      :
      <Component {...pageProps} />
    }
    {/^\/app/.test(route) && <NavBar />}
    </RecoilRoot>
    </>
  )
}
