import { styled } from 'linaria/react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'

export const container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(32.84deg, #F97800 -108.18%, #FFB066 91.15%);
  touch-action: none;
  display: grid;
  justify-items: center;
  align-content: center;
  grid-template-rows: repeat(3, max-content);
  gap: 1rem 0;
`

export const loginButton = styled(motion.a)`
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0 0 0 2px white inset;
  color: white;
  border-radius: 1.75rem;
  font-size: 1.3rem;
  width: 20rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`

export const logo = styled.svg`
  width: 6rem;
  margin-bottom: 5rem;
  fill: white;
`

export const transition: Transition = {
  default: {
    type: 'spring',
    stiffness: 300,
    damping: 50,
    mass: 1,
    velocity: 0
  },
  backgroundColor: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut'
  },
  color: {
    type: 'tween',
    duration: 0.1,
    ease: 'easeOut'
  }
}
