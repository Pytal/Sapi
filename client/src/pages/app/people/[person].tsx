import { Title } from '../../../components/Title'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '../../../utils/api'
import { useRecoilValue } from 'recoil'
import { useAddSpoonMutation, useCheckConversationQuery } from '../../../operations/ConversationOperations'
import { PersonAtom } from '../../../atoms/Atoms'
import { person } from '../../../styled'
import { food } from '../../../svg'
import { rem, rgba } from 'polished'
import type { Profile, PageProps } from '../../../types/types'


export default ({ profileID }: PageProps) => {
  const router = useRouter()
  const { query: { person: id } } = router

  const personInfo = useRecoilValue(PersonAtom)

  const [profile, setProfile] = useState<null|Profile>(null)
  const [conversationID, setConversationID] = useState<null|number>(null)
  const [_, addSpoon] = useAddSpoonMutation()
  const [animMessage, setAnimMessage] = useState(false)
  const [animSpoon, setAnimSpoon] = useState(false)

  const [{ data: convData }] = useCheckConversationQuery({ variables: { ownerID: profileID, participantID: Number(id) } })


  useEffect(() => {
    if (convData?.conversation.length) setConversationID(convData.conversation[0].id)
  }, [convData])

  useEffect(() => {(async _ => {
    if (id) {
      const { nearbyProfile } = await api.post( 'op/get-nearby-profile', { id } )
      setProfile(nearbyProfile)
    }
  })()}, [id])


  const handleMessage = async () => {
    setAnimMessage(true)
    if (convData && !conversationID) {
      const { conversationID } = await api.get( 'op/add-conversation' )

      const { addedConversationParticipant } = await api.post( 'op/add-conversation-participant', {
        conversationID,
        participantID: id
      })

      if (addedConversationParticipant) {
        router.push( '/app/conversations/[chat]', `/app/conversations/${conversationID}` )
      }
    }
    else {
      router.push( '/app/conversations/[chat]', `/app/conversations/${conversationID}` )
    }
  }

  const handleSpoon = async () => {
    setAnimSpoon(true)
    await addSpoon({ senderID: profileID, recipientID: Number(id) })
  }

  let vh = 0
  if (typeof window !== 'undefined') vh = document.body.clientHeight


  return (
    <>
    <Title>{`${personInfo?.firstName ?? profile?.firstName}'s Profile`}</Title>
    <person.container>
      <person.banner>
        <person.picture
          // hardcoded style
          style={(personInfo?.firstName === 'josh ' || profile?.id === 417) ? { objectPosition: 'center' } : {} }
          src={personInfo?.profilePicture ?? profile?.profilePicture} />
        <person.bar>
        <person.name>{personInfo?.firstName ?? profile?.firstName}</person.name>
          <person.actions>
            <person.actionButton
              onTap={handleMessage}
              animate={ animMessage ? { scale: 0.8, boxShadow: `0 0 0 1rem ${rgba(105, 137, 242, 0.5)}` } : { scale: 1, boxShadow: `0 0 0 0rem ${rgba(105, 137, 242, 0.5)}` }}
              transition={{ type: 'tween', yoyo: Infinity, ease: 'backOut', duration: 1 }} >
              <person.actionIcon viewBox="0 0 297.23 293.39">
                <path d="M210.44,0H86.78A86.78,86.78,0,0,0,0,86.78v62H0v1.93H.1a20,20,0,0,0,39.8,0H40V148.8h0v-62A46.84,46.84,0,0,1,86.78,40H210.44a46.84,46.84,0,0,1,46.79,46.78v63.94a46.84,46.84,0,0,1-46.79,46.79H86.78S0,191.18,0,273.39a20,20,0,0,0,40,0s-2-35.88,46.78-35.88H210.44a86.79,86.79,0,0,0,86.79-86.79V86.78A86.79,86.79,0,0,0,210.44,0Z" />
              </person.actionIcon>
            </person.actionButton>
            <person.actionButton
              onTap={handleSpoon}
              animate={ animSpoon ? { backgroundColor: '#F77800', scale: 0.8, rotate: 180, boxShadow: `0 0 0 ${rem(vh*2)} ${rgba(245, 118, 0, 0.6)}, 0 0 0 2px white inset` } : { backgroundColor: '#6988F2', scale: 1, rotate: 0, boxShadow: `0 0 0 ${rem(vh*2)} ${rgba(245, 118, 0, 0)}, 0 0 0 0px white inset` }}
              onAnimationComplete={() => setAnimSpoon(false)}
              transition={person.spoonTransition}>
              <person.actionIcon viewBox="0 0 216.55 303.41">
                <path d="M216.47,143.18C215.15,105.73,205,72,187,45.63,167.28,16.63,140,0,112.07,0h-7.6C76.59,0,49.27,16.63,29.53,45.63,11.59,72,1.4,105.73.08,143.18c-1.42,40.22,16.51,75.06,50.5,98.09,2.18,1.48,4.29,2.81,6.36,4.06l-1.78,37.5a20,20,0,0,0,40,0l2.18-47h-.1c.06-.6.09-1.21.09-1.82a19.83,19.83,0,0,0-11.56-18l0,0C65.52,206,39.64,184.75,41.05,144.59,43.33,80.17,77.43,40,105.47,40h7.6c28,0,62.15,40.17,64.42,104.59,1.41,40-25.07,61.39-45.3,71.34v0a19.85,19.85,0,0,0-12.95,18.6q0,.93.09,1.83h-.09l2.17,47a20,20,0,0,0,40,0l-1.8-37.93c2.16-1.39,4.31-2.83,6.34-4.21C200,218.24,217.89,183.4,216.47,143.18Z"/>
              </person.actionIcon>
            </person.actionButton>
          </person.actions>
        </person.bar>
      </person.banner>
      <person.details>
        <person.detailContainer>
          <person.label>Bio</person.label>
          <person.description>{profile?.bio}</person.description>
        </person.detailContainer>
        <person.detailContainer>
          <person.label>Favourites</person.label>
          <person.foodRow>
            {
            // hardcoded food icons
            Number(id) < 260 ?
              <>
              <food.sushi as={person.foodIcon} />
              <food.burger as={person.foodIcon} />
              <food.vegan as={person.foodIcon} />
              </>
              : Number(id) < 300 ?
              <>
              <food.ramen as={person.foodIcon} />
              <food.breakfast as={person.foodIcon} />
              <food.pizza as={person.foodIcon} />
              <food.vegan as={person.foodIcon} />
              <food.sushi as={person.foodIcon} />
              </>
              : Number(id) < 443 ?
              <>
              <food.tacos as={person.foodIcon} />
              <food.dumplings as={person.foodIcon} />
              <food.burger as={person.foodIcon} />
              </>
              :
              <>
              <food.sandwich as={person.foodIcon} />
              <food.vegan as={person.foodIcon} />
              </>
            }
          </person.foodRow>
        </person.detailContainer>
        <person.detailContainer>
          <person.label>Eating Styles</person.label>
          <person.hashtagRow>
            <person.hashtag>#SweetTooth</person.hashtag>
            <person.hashtag>#Gourmet</person.hashtag>
            <person.hashtag>#Speedy</person.hashtag>
            <person.hashtag>#HeatEnthusiast</person.hashtag>
            <person.hashtag>#JackOfAllTrades</person.hashtag>
            <person.hashtag>#FierceEater</person.hashtag>
            <person.hashtag>#Hangry</person.hashtag>
          </person.hashtagRow>
        </person.detailContainer>
      </person.details>
    </person.container>
    </>
  )
}
