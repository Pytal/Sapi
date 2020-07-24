import { styled } from 'linaria/react'
import { motion } from 'framer-motion'

export const animatedPage = styled(motion.div)`
  position: fixed;
  height: 100%;
  width: 100%;
`

export const navBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 3.5rem;
  background-color: rgba(255,255,255,0.88);
  backdrop-filter: blur(8px);
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.09);
`

export const navIcon = styled.svg<{ selected: boolean }>`
  width: 28px;
  height: 28px;
  padding: 0.7rem 2rem;
  cursor: pointer;
  fill: ${({ selected }) => selected ? '#6988F2' : '#B7B7B7'};
`

export const loadingPage = styled.div`
  height: 100%;
  width: 100vw;
  background-color: white;
  display: flex;
  justify-content: center;
`

export const loadingLogo = styled.svg`
  margin-top: 10rem;
  width: 3rem;
  height: 3rem;
  fill: rgba(0,0,0,0.1);
`
