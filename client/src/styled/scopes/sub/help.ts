import { styled } from 'linaria/react'

export const container = styled.div`
  height: 100%;
  width: 100vw;
  background-color: white;
  touch-action: pan-y;
  overflow: overlay;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const header = styled.h1`
  width: 90%;
  text-align: center;
`

export const content = styled.p`
  font-size: 0.9rem;
`
