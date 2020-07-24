import { styled } from 'linaria/react'

export const container = styled.div`
  height: 100%;
  background-color: white;
  touch-action: pan-y;
  overflow: overlay;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const categories = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 5rem 0;
`

export const label = styled.span`
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-indent: 1.5rem;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  font-size: 1.5rem;
  height: 3rem;
  line-height: 3rem;
`

export const food = styled.div`
  display: flex;
  flex-direction: column;
`

export const foodRow = styled.div`
  width: 100vw;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat( auto-fit, 3rem );
  gap: 0 1.2rem;
  overflow-x: overlay;
  margin-bottom: 1.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const foodIcon = styled.svg`
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 1.2rem;
  cursor: pointer;
`

export const people = styled.div`
  display: flex;
  flex-direction: column;
`

export const peopleGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat( auto-fit, 7.81rem );
`

export const person = styled.img`
  width: 7.81rem;
  height: 7.81rem;
  object-fit: cover;
  cursor: pointer;
`

export const personPlaceholder = styled.div`
  justify-self: center;
  margin: 0.3rem 0;
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 0.3rem;
  background-color: rgba(0,0,0,0.1);
`
