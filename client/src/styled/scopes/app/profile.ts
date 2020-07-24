import { styled } from 'linaria/react'
import { motion } from 'framer-motion'

export const container = styled.div`
  height: 100%;
  width: 100vw;
  background-color: white;
  touch-action: pan-y;
  overflow: overlay;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const banner = styled.div`
  position: fixed;
  width: 100vw;
  display: grid;
  background-color: rgba(255,255,255,0.5);
  box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.3);
`

export const helpIcon = styled(motion.svg)`
  position: absolute;
  top: 1rem;
  right: 3.5rem;
  width: 1.8rem;
  height: 1.8rem;
  stroke: white;
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  cursor: pointer;
`

export const logoutIcon = styled(motion.svg)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.8rem;
  height: 1.8rem;
  stroke: white;
  stroke-width: 2;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  cursor: pointer;
`

export const picture = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  object-position: center 20%;
  background-color: rgba(0,0,0,0.1);
  border-radius: 0 0 0.8rem 0.8rem;
`

export const bar = styled.div`
  width: 100vw;
  display: grid;
  grid-template-rows: 3.5rem 4rem;
  background-color: white;
`

export const name = styled.span`
  font-size: 2.3rem;
  justify-self: center;
  align-self: center;

  &:empty {
    width: 10rem;
    height: 2.2rem;
    align-self: flex-end;
    margin-bottom: 0.15rem;
    border-radius: 0.8rem;
    background-color: rgba(0,0,0,0.1);
  }
`

export const actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0.25rem;
`

export const actionButton = styled(motion.div)`
  width: 3rem;
  height: 3rem;
  background-color: #6988F2;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.3rem;
  cursor: pointer;
`

export const actionIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: white;
`

export const details = styled.div`
  margin: 28rem 0 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const detailContainer = styled.div`
  margin-top: 1rem;
  width: 85%;
`

export const label = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`

export const description = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.15);

  &:empty {
    height: 1.2rem;
    background-color: rgba(0,0,0,0.1);
  }
`

export const foodRow = styled.div`
  display: flex;
  margin: 1rem 0;
`

export const foodIcon = styled.svg`
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 0.5rem;
`

export const hashtagRow = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-wrap: wrap;
`

export const hashtag = styled.div`
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;
  margin: 0.3rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 1px rgba(0,0,0,0.15);
`
