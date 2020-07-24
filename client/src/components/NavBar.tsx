import Link from 'next/link'
import { useRouter } from 'next/router'
import { app } from '../styled'
import { icon } from '../svg'

export const NavBar = () => {
  const { route } = useRouter()
  const scope = route.replace( '/app/', '' )

  return (
    <app.navBar>
      <Link href='/app/home'>
        <icon.home
          as={app.navIcon}
          selected={scope.includes('home') || scope.includes('restaurants')}
        />
      </Link>
      <Link href='/app/nearby'>
        <icon.nearby
          as={app.navIcon}
          selected={scope.includes('nearby') || scope.includes('people')}
        />
      </Link>
      <Link href='/app/conversations'>
        <icon.conversations
          as={app.navIcon}
          selected={scope.includes('conversations')}
        />
      </Link>
      <Link href='/app/profile'>
        <icon.profile
          as={app.navIcon}
          selected={scope.includes('profile')}
        />
      </Link>
    </app.navBar>
  )
}
