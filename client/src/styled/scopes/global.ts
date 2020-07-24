import { css } from 'linaria'
import type { Transition } from 'framer-motion'

css`
:global(body) {
  position: fixed;
  /* overflow: hidden; */
  height: 100%;
  width: 100%;
  margin: 0;
  touch-action: none;
  user-select: none;
  background-color: #E5E3DF;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;
  display: flex;
  overflow: overlay;

  &::-webkit-scrollbar {
    display: none;
  }

  font-family: -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}
`

export const pageTransition: Transition = {
  default: {
    type: 'spring',
    stiffness: 270,
    damping: 30,
    mass: 1,
    velocity: 0
  },
  opacity: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeOut'
  }
}
