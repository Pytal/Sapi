import { styled } from 'linaria/react'
import { motion } from 'framer-motion'
import { rgba } from 'polished'
import type { Transition } from 'framer-motion'

export const banner = styled(motion.div)<{ expanded: boolean }>`
  position: fixed;
  top: 0;
  background-color: ${({ expanded }) => expanded ? 'white' : rgba(255,255,255,0) };
  height: 3.5rem;
  width: 100vw;
  color: #222;
  display: grid;
  justify-items: center;
  align-items: center;
  z-index: 1;
`

export const searchIcon = styled.svg`
  grid-area: 1/1;
  margin-right: 17rem;
  width: 1.3rem;
  height: 1.3rem;
  stroke: rgb(204, 204, 204);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  z-index: 1;
`

export const searchBar = styled(motion.input)`
  grid-area: 1/1;
  width: 20rem;
  height: 2.2rem;
  border-radius: 2rem;
  border: none;
  outline: none;
  font-size: 1rem;
  text-indent: 2.5rem;
  -webkit-appearance: none;

  &::placeholder {
    color: rgb(179, 179, 179);
  }
`

export const container = styled.div`
  height: 100%;
  width: 100vw;
  background-color: #E5E3DF;
  touch-action: pan-y;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const map = styled.iframe`
  position: fixed;
  top: -11%;
  width: 100vw;
  height: 111%;
  border: none;
  pointer-events: none;
`

export const sheet = styled(motion.div)<{ expanded: boolean }>`
  border-radius: ${({ expanded }) => expanded ? '0rem' : '1rem'};
  height: 100%;
  width: 100%;
  box-shadow: 0 0 ${({ expanded }) => expanded ? '0rem' : '0.5rem'} 0 rgba(0,0,0,0.5);
  background-color: white;
  display: grid;
  grid-template-rows: 2rem 3.5rem 1fr;
  justify-content: center;
  justify-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const sheetThumbContainer = styled(motion.div)<{ overscrolled: boolean }>`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 2.5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ overscrolled }) => overscrolled ? '0 0 0.5rem 0 rgba(0,0,0,0.2)' : '0 0 0rem 0 rgba(0,0,0,0.2)'};
  cursor: pointer;
  z-index: 2;
`

export const sheetThumb = styled.div`
  width: 3rem;
  height: 0.5rem;
  background-color: rgba(0,0,0,0.1);
  border-radius: 0.5rem;
`

export const sheetHeader = styled.h1`
  color: #167048;
  font-size: 1.8rem;
  margin: 0;
  align-self: center;
`

export const sheetContent = styled.div`
  width: 90%;
  background-color: white;
  margin: 0.5rem 0 10rem 0;
  display: flex;
  flex-direction: column;
`

export const sheetItemContainer = styled(motion.div)`
  display: grid;
`

export const sheetItem = styled(motion.div)`
  grid-area: 1/1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`

export const sheetItemDetailsContainer = styled(motion.div)`
  grid-area: 1/1;
  z-index: 1;
  border-radius: 0.5rem;
  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(8px);
  height: 12rem;
  align-self: flex-end;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-rows: 3rem 1fr;
  grid-template-areas: 'close open share'
                       'event event event';
  justify-items: center;
  align-items: flex-start;
  cursor: pointer;
`

export const sheetItemClose = styled(motion.svg)<{ revealed: boolean }>`
  grid-area: close;
  width: 2rem;
  height: 2rem;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  align-self: center;
  justify-self: flex-start;
  margin: 0 0 0 1.5rem;
  pointer-events: ${({ revealed }) => revealed ? 'all' : 'none'};
`

export const sheetItemOpen = styled(motion.svg)<{ revealed: boolean }>`
  grid-area: open;
  width: 2rem;
  height: 2rem;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  align-self: center;
  justify-self: center;
  fill: none;
  pointer-events: ${({ revealed }) => revealed ? 'all' : 'none'};
`

export const sheetItemShare = styled(motion.svg)<{ revealed: boolean }>`
  grid-area: share;
  width: 1.7rem;
  height: 1.7rem;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  align-self: center;
  justify-self: flex-end;
  margin: 0 1.7rem 0 0;
  fill: none;
  pointer-events: ${({ revealed }) => revealed ? 'all' : 'none'};
`

export const sheetItemEvent = styled.div`
  grid-area: event;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #6988F2 10%, #EFBDB0);
  border-radius: 0.5rem;
  padding: 1rem;
`

export const sheetItemEventInfo = styled.p`
  color: white;
  width: 80%;
  font-size: 0.82rem;
  margin: 0 0.5rem 0 0;
`

export const sheetItemEventButton = styled(motion.button)<{ revealed: boolean }>`
  border: none;
  outline: none;
  width: 7rem;
  height: 2.6rem;
  border-radius: 1.3rem;
  background-color: white;
  color: #6988F2;
  font-weight: bold;
  padding: 0;
  font-size: 0.9rem;
  pointer-events: ${({ revealed }) => revealed ? 'all' : 'none'};
  cursor: pointer;
`

export const sheetLabel = styled.span`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

export const sheetImg = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 0.5rem;
  z-index: 1;
`

export const shareSheet = styled(motion.div)`
  position: fixed;
  background-color: white;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  overflow-x: overlay;
`

export const shareRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin: 1.5rem 1rem 0 1rem;
`

export const shareImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2rem;
  justify-self: center;
  align-self: center;
  margin: 0 0.3rem;
  cursor: pointer;
  object-fit: cover;
`

export const shareRowLoadingTagline = styled.h3`
  color: #B7B7B7;
  text-align: center;
  width: 100%;
`

export const shareSheetClose = styled(motion.svg)`
  width: 2rem;
  height: 2rem;
  stroke: rgb(212, 212, 212);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  align-self: center;
  justify-self: center;
  margin: 1rem 0;
  cursor: pointer;
`

export const sheetItemTransition: Transition = {
  default: {
    type: 'spring',
    stiffness: 500,
    damping: 25,
    mass: 1,
    velocity: 0
  },
  y: {
    type: 'tween',
    duration: 0.3,
    ease: 'anticipate'
  },
  opacity: {
    type: 'tween',
    duration: 0.2,
    ease: 'easeOut'
  },
  backgroundColor: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut'
  },
  color: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut'
  }
}
