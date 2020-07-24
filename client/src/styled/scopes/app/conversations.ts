import { styled } from 'linaria/react'
import { motion, Transition } from 'framer-motion'

export const banner = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 3.5rem;
  background-color: rgba(235, 235, 235, 0.5);
  backdrop-filter: blur(8px);
  color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  font-size: 0.7rem;
`

export const segmenter = styled.div`
  display: flex;
  background-color: rgba(199, 199, 199, 0.5);
  height: 2.2rem;
  border-radius: 1.1rem;
  justify-content: center;
  align-items: center;
  padding: 0 0.3rem;
`

export const segment = styled(motion.div)<{ selected: boolean }>`
  background-color: transparent;
  color: ${({ selected }) => selected ? 'white': 'black'};
  font-weight: ${({ selected }) => selected ? 500 : 400 };
  border:none;
  border-radius:1rem;
  outline: none;
  height: 1.5rem;
  display: grid;
  align-content: center;
  align-items: center;
  cursor: pointer;
`

export const segmentLabel = styled.div`
  grid-area: 1/1;
  padding: 2px 0.5rem;
  font-size: 1rem;
  width: 8rem;
  text-align: center;
  margin-bottom: 0.1rem;
  z-index: 1;
  display: flex;
  justify-content: center;
`

export const segmentTally = styled.div`
  align-self: center;
  margin-left: 0.2rem;
  padding: 0.2rem;
  height: 0.8rem;
  min-width: 0.8rem;
  font-size: 0.7rem;
  line-height: 0.8rem;
  border-radius: 0.6rem;
  background-color: rgba(199, 199, 199, 0.3);
`

export const segmentHighlight = styled(motion.div)`
  grid-area: 1/1;
  background-color: #6988F2;
  width: 100%;
  height: 1.7rem;
  border-radius: 0.9rem;
  box-shadow: 0 1.5px 5px 0 rgba(0,0,0,0.3);
`

export const container = styled.div`
  height: 100%;
  background-color: white;
  touch-action: pan-y;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const loadingTagline = styled.h3`
  color: #B7B7B7;
  text-align: center;
`

export const list = styled.div`
  width: 100vw;
  margin: 3.5rem 0 5rem 0;
  display: flex;
  flex-direction: column-reverse;
`

export const chat = styled(motion.div)`
  height: 6rem;
  background-color: white;
  display: grid;
  grid-template-columns: 1.5rem max-content 1fr;
  grid-template-rows: 2.5rem 1fr;
  grid-template-areas: 'indicator img label'
                       'indicator img preview';
  cursor: pointer;
`

export const spoon = styled(motion.div)`
  height: 6rem;
  background-color: white;
  display: flex;
  align-items: center;
`

export const spoonImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2rem;
  justify-self: center;
  align-self: center;
  margin: auto 0 auto 1.5rem;
  object-fit: cover;
  cursor: pointer;
`

export const spoonLabel = styled.h3`
  font-size: 1.1rem;
  margin: auto auto auto 0.5rem;
  cursor: pointer;
`

export const spoonButton = styled(motion.div)`
  width: 3rem;
  height: 3rem;
  background-color: #F77800;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.5rem 0 0.25rem;
  cursor: pointer;
  justify-self: right;
`

export const spoonIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: white;
`

export const chatIndicator = styled.svg`
  grid-area: indicator;
  width: 0.6rem;
  height: 0.6rem;
  fill: #6988F2;
  justify-self: center;
  align-self: center;
`

export const chatImg = styled.img`
  grid-area: img;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2rem;
  justify-self: center;
  align-self: center;
  object-fit: cover;
`

export const chatLabel = styled.h3`
  grid-area: label;
  font-size: 1.1rem;
  align-self: flex-end;
  margin: 0 1.5rem 0 0.5rem;
`

export const chatPreview = styled.p`
  grid-area: preview;
  font-size: 0.85rem;
  color: #5E5E5E;
  line-height: 1.15rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: flex-start;
  margin: 0 1.5rem 0 0.5rem;
`

export const segmentTransition: Transition = {
  default: {
    type: 'spring',
    stiffness: 300,
    damping: 50,
    mass: 1,
    velocity: 0
  },
  opacity: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeOut'
  },
  backgroundColor: {
    type: 'tween',
    duration: 0.2,
    ease: 'easeOut'
  }
}

export const spoonTransition: Transition = {
  default: {
    type: 'spring',
    stiffness: 800,
    damping: 38,
    mass: 1,
    velocity: 0
  },
  boxShadow: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut'
  }
}
