import { styled } from 'linaria/react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'

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
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.3);
`

export const header = styled.span`
  font-size: 1.5rem;
`

export const details = styled.div`
  margin: 3.5rem 0 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const detailContainer = styled.div`
  margin-top: 1rem;
  width: 90%;
`

export const label = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`

export const pictureGrid = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 65% 1fr;
  grid-template-rows: 4rem 4rem;
  grid-template-areas: 'main sub1'
                       'main sub2';
  gap: 0.5rem;
`

export const mainImg = styled.img`
  grid-area: main;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`

export const subImg1 = styled.img`
  grid-area: sub1;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`

export const subImg2 = styled.img`
  grid-area: sub2;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
`

export const sheetItemEvent = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #6988F2 10%, #EFBDB0);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem auto 0 auto;
`

export const sheetItemEventInfo = styled.p`
  color: white;
  width: 80%;
  font-size: 0.82rem;
  margin: 0 0.5rem 0 0;
`

export const sheetItemEventButton = styled(motion.button)`
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
  cursor: pointer;
`

export const reviewList = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`

export const review = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 1.5rem 1fr;
  grid-template-areas: 'img name'
                       'img content';
  margin: 0.5rem 0;
`

export const reviewImg = styled.img`
  grid-area: img;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2rem;
  object-fit: cover;
`

export const reviewerName = styled.span`
  grid-area: name;
  font-weight: bold;
`

export const reviewText = styled.p`
  grid-area: content;
  margin: 0;
  font-size: 0.85rem;
`

export const transition: Transition = {
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
