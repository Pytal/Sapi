import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { rem } from 'polished'
import { app } from '../styled'
import { global } from '../styled'
import type { ReactNode } from 'react'
import type { Variants } from 'framer-motion'

interface AnimateProps {
  children: ReactNode
}

export const Animate = ({ children: Component }: AnimateProps) => {
  const { route } = useRouter()

  const disabledRoutes = [
    '/app/home',
    '/app/nearby',
    '/app/conversations',
    '/app/profile'
  ]
  const shouldAnimate = !disabledRoutes.includes(route)

  let vw: number = 0
  if ( typeof window !== 'undefined' ) { vw = document.body.clientWidth }

  const pageVariants: Variants = {
    from: { x: rem(shouldAnimate ? vw : 0), filter: `brightness(1)` },
    in: { x: rem(0), filter: `brightness(1)` },
    exit: { x: rem(-vw/2), filter: `brightness(0.7)` }
  }

  return (
    <AnimatePresence
      initial={false}>
      <app.animatedPage
        variants={pageVariants}
        transition={global.pageTransition}
        initial={'from'}
        animate={'in'}
        exit={'exit'}
        key={route}>
        {Component}
      </app.animatedPage>
    </AnimatePresence>
  )
}
