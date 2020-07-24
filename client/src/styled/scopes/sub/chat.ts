import { styled } from 'linaria/react'

export const banner = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 3.5rem;
  background-color: rgba(235, 235, 235, 0.5);
  backdrop-filter: blur(8px);
  color: #222;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

export const labelImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  object-fit: cover;
  cursor: pointer;
`

export const label = styled.span`
  padding: 0 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  z-index: 1;
  cursor: pointer;
`

export const container = styled.div`
  height: 100%;
  background-color: white;
  touch-action: pan-y;
  overflow-y: overlay;
  display: flex;
  flex-direction: column-reverse;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const thread = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column-reverse;
  margin: 0 0 7rem 0;
  padding: 4rem 0 0 0;
`

export const message = styled.div`
  display: grid;
  grid-template-columns: 3rem max-content;
  grid-template-areas: 'img content';
  height: max-content;
  margin: 0.5rem 0;
`

export const sentMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0;
`

export const messageImg = styled.img`
  grid-area: img;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 2rem;
  justify-self: center;
  align-self: flex-start;
  object-fit: cover;
`

export const messageContent = styled.span`
  grid-area: content;
  max-width: 70vw;
  height: max-content;
  color: #222;
  background-color: rgb(230, 230, 230);
  border-radius: 1rem;
  padding: 0.5rem 0.8rem;
  font-size: 0.92rem;
  white-space: pre-line;
`

export const sentMessageContent = styled.div`
  max-width: 70%;
  height: max-content;
  color: white;
  background-color: #6988F2;
  border-radius: 1rem;
  padding: 0.5rem 0.8rem;
  margin-right: 0.5rem;
  font-size: 0.92rem;
  white-space: pre-line;
`

export const messageBox = styled.div`
  position: fixed;
  bottom: 56px;
  width: 100vw;
  background-color: rgba(235, 235, 235, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export const messageInput = styled.div<{ autoFocus: boolean }>`
  width: 75%;
  outline: none;
  background-color: rgb(250, 250, 250);
  min-height: 1rem;
  max-height: 20rem;
  border-radius: 1rem;
  font-size: 0.92rem;
  font-family: inherit;
  padding: 0.3rem 1rem;
  margin: 0.5rem 0;
  overflow-y: overlay;
  white-space: pre-line;

  &:empty::before {
    content: attr(placeholder);
    color: rgb(191, 191, 191);
  }

  &:focus {
    background-color: white;
  }
`

export const messageSendIcon = styled.svg`
  fill: #6988F2;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
`
