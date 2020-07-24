import { Title } from '../../../components/Title'
import Link from 'next/link'
import { useState } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ChatAtom, SpoonAtom, PersonAtom } from '../../../atoms/Atoms'
import { useAddSpoonMutation } from '../../../operations/ConversationOperations'
import { conversations } from '../../../styled'
import { rem, rgba, rgb } from 'polished'
import type { Transition } from 'framer-motion'
import type { PageProps } from '../../../types/types'


export default ({ profileID }: PageProps) => {
  const chats = useRecoilValue(ChatAtom)
  const spoons = useRecoilValue(SpoonAtom)

  const [segment, setSegment] = useState(0)
  const segments = ['Conversations', 'Spoons']

  const setPerson = useSetRecoilState(PersonAtom)

  const [spoonSegment, setSpoonSegment] = useState<null|number>(null)

  const [_, addSpoon] = useAddSpoonMutation()

  const handleSpoon = async (i: number, id: number) => {
    setSpoonSegment(i)
    await addSpoon({ senderID: profileID, recipientID: id })
  }

  let vh = 0
  if (typeof window !== 'undefined') vh = document.body.clientHeight

  const listTransition: Transition = {
    default: {
      type: 'spring',
      stiffness: 300,
      damping: 28,
      mass: 1,
      velocity: 0
    },
    opacity: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeOut'
    },
    zIndex: {
      type: false,
      delay: (typeof spoonSegment === 'number') ? 0 : 0.1
    },
    backgroundColor: {
      type: 'tween',
      duration: 0.2,
      ease: 'easeOut'
    }
  }


  return (
    <>
    <Title>Conversations</Title>
    <conversations.banner>
      <conversations.segmenter>
        <AnimateSharedLayout transition={conversations.segmentTransition}>
        {segments.map( (label,i) =>
          <conversations.segment
            animate
            onTap={_ => setSegment(i)}
            selected={segment === i}
            key={i} >
            <conversations.segmentLabel>
              {label}
              {(label === 'Spoons' && Boolean(spoons?.length)) && <conversations.segmentTally>{spoons?.length}</conversations.segmentTally>}
            </conversations.segmentLabel>
            {(segment === i) && <conversations.segmentHighlight layoutId='highlight' />}
          </conversations.segment>
        )}
        </AnimateSharedLayout>
      </conversations.segmenter>
    </conversations.banner>
    <conversations.container>
    {(segment === 0) ?
      <conversations.list>
      {chats?.length ?
        chats.map( ({ id, unread, recipient, preview }, i) =>
          <Link href='/app/conversations/[chat]' as={`/app/conversations/${id}`} key={i}>
            <conversations.chat
              transition={conversations.segmentTransition}
              whileHover={{ backgroundColor: rgb(245, 245, 245) }}
              whileTap={{ backgroundColor: rgb(245, 245, 245) }}
            >
              {unread && <conversations.chatIndicator viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"/></conversations.chatIndicator>}
              <conversations.chatImg src={recipient?.profilePicture} />
              <conversations.chatLabel>{recipient?.firstName}</conversations.chatLabel>
              <conversations.chatPreview>{preview}</conversations.chatPreview>
            </conversations.chat>
          </Link>
        )
        :
        <conversations.loadingTagline>Great Conversations...</conversations.loadingTagline>
      }
      </conversations.list>
      :
      <conversations.list>
        {spoons?.length ?
          spoons.map( ({ id, firstName, profilePicture }, i) =>
            <conversations.spoon
              whileHover={{ backgroundColor: rgb(245, 245, 245) }}
              whileTap={{ backgroundColor: rgb(245, 245, 245) }}
              initial={{ y: '-9.5rem', opacity: 0, zIndex: 0 }}
              animate={spoonSegment === i ? { y: rem(0), opacity: 1, zIndex: 1 } : { y: rem(0), opacity: 1, zIndex: 0 }}
              transition={listTransition}
              key={i}>
              <Link href='/app/people/[person]' as={`/app/people/${id}`} >
                <conversations.spoonImg
                  onClick={_ => setPerson({ firstName, profilePicture })}
                  src={profilePicture} />
              </Link>
              <Link href='/app/people/[person]' as={`/app/people/${id}`} >
                <conversations.spoonLabel
                  onClick={_ => setPerson({ firstName, profilePicture })}>
                  {firstName}
                </conversations.spoonLabel>
              </Link>
              <conversations.spoonButton
                onTapStart={_ => handleSpoon(i, id)}
                animate={spoonSegment === i ? { backgroundColor: '#F77800', scale: 0.8, rotate: 180, boxShadow: `0 0 0 ${rem(vh*2)} ${rgba(245, 118, 0, 0.6)}, 0 0 0 2px white inset` } : { backgroundColor: '#F77800', scale: 1, rotate: 0, boxShadow: `0 0 0 ${rem(vh*2)} ${rgba(245, 118, 0, 0)}, 0 0 0 0px white inset` }}
                onAnimationComplete={() => setSpoonSegment(null)}
                transition={conversations.spoonTransition}
              >
                <conversations.spoonIcon viewBox="0 0 216.55 303.41">
                  <path d="M216.47,143.18C215.15,105.73,205,72,187,45.63,167.28,16.63,140,0,112.07,0h-7.6C76.59,0,49.27,16.63,29.53,45.63,11.59,72,1.4,105.73.08,143.18c-1.42,40.22,16.51,75.06,50.5,98.09,2.18,1.48,4.29,2.81,6.36,4.06l-1.78,37.5a20,20,0,0,0,40,0l2.18-47h-.1c.06-.6.09-1.21.09-1.82a19.83,19.83,0,0,0-11.56-18l0,0C65.52,206,39.64,184.75,41.05,144.59,43.33,80.17,77.43,40,105.47,40h7.6c28,0,62.15,40.17,64.42,104.59,1.41,40-25.07,61.39-45.3,71.34v0a19.85,19.85,0,0,0-12.95,18.6q0,.93.09,1.83h-.09l2.17,47a20,20,0,0,0,40,0l-1.8-37.93c2.16-1.39,4.31-2.83,6.34-4.21C200,218.24,217.89,183.4,216.47,143.18Z"/>
                </conversations.spoonIcon>
              </conversations.spoonButton>
            </conversations.spoon>
          )
          :
          <conversations.loadingTagline>Spoons Incoming...</conversations.loadingTagline>
        }
      </conversations.list>
    }
    </conversations.container>
    </>
  )
}
