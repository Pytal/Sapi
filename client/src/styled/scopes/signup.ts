import { styled } from 'linaria/react'
import { motion } from 'framer-motion'
import { Form, Field } from 'formik'
import type { Transition } from 'framer-motion'

export const container = styled.div`
  width: 100vw;
  height: 100%;
  background-color: white;
  touch-action: none;
`

export const header = styled(motion.h1)`
  width: 20rem;
  font-size: 3rem;
  font-weight: bold;
  margin: 5rem 0 3rem 0;
`

export const button = styled(motion.button)`
  position: fixed;
  border: none;
  outline: none;
  color: white;
  border-radius: 1.5rem;
  font-size: 1.2rem;
  width: 20rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`

export const form = styled(Form)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`

export const stageContainer = styled(motion.div)`
  position: fixed;
  display: grid;
  gap: 1rem 0;
  justify-items: center;
`

export const fieldContainer = styled.div`
  width: 20rem;
`

export const input = styled(Field)<{ type: string }>`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 2rem;
  padding: 0;
  font-weight: bold;
  -webkit-appearance: none;
  line-height: 2rem;
  font-family: inherit;
  text-transform: ${({ type }) => type === 'date' ? 'uppercase' : 'none' };

  &::placeholder {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: normal;
    color: rgb(224, 224, 224);
  }
`

export const inputHighlight = styled.div`
  background-color: black;
  width: 100%;
  height: 0.1rem;
  margin: 0.5rem 0 0.2rem 0;
`

export const errorMsg = styled.div`
  height: 1.5rem;
  width: 100%;
  font-size: 1rem;
`

export const toggle = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0 1rem;
`

export const label = styled(motion.label)<{ checked: boolean }>`
  background-color: ${({ checked }) => checked ? '#6988F2' : 'transparent' };
  height: 2.5rem;
  width: 6rem;
  border-radius: 1.5rem;
  color: ${({ checked }) => checked ? 'white' : 'rgb(153, 153, 153)' };
  text-align: center;
  line-height: 2.3rem;
  box-shadow: ${({ checked }) => checked ? '0 0 0 1px #6988F2' : '0 0 0 1px rgb(204, 204, 204)' };
  font-size: 1.2rem;
`

export const radio = styled(Field)`
  display: none;
`

export const transition: Transition = {
  default: {
    type: 'spring',
    stiffness: 270,
    damping: 30,
    mass: 1,
    velocity: 0
  },
  opacity: {
    type: 'tween',
    delay: 0.28,
    duration: 0.3,
    ease: 'easeOut'
  },
  y: {
    type: 'spring',
    stiffness: 250,
    damping: 28,
    mass: 1,
    velocity: 0
  },
  backgroundColor: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeOut'
  },
  boxShadow: {
    type: 'tween',
    duration: 0.2,
    ease: 'easeOut'
  }
}
