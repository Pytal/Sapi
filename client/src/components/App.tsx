import { Animate } from './Animate'
import { useEffect, useState } from 'react'
import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil'
import { ShareAtom, PeopleAtom, ProfileAtom, ChatAtom, SpoonAtom } from '../atoms/Atoms'
import { api } from '../utils/api'
import { useOnAddConversationSubscription, useOnAddSpoonSubscription } from '../operations/ConversationOperations'
import type { AppProps } from 'next/app'
import type { PageProps } from '../types/types'


export const App = ({ Component, pageProps, router, profileID }: AppProps & PageProps) => {
  const { route } = router

  const [people, setPeople] = useRecoilState(PeopleAtom)
  const [profile, setProfile] = useRecoilState(ProfileAtom)
  const resetShare = useResetRecoilState(ShareAtom)


  useEffect(() => {(async _ => {
    if (!people && !profile) {
      const { nearbyProfiles: people } = await api.post( 'op/nearby-profiles', { profileID } )
      const { profile } = await api.get( 'op/get-profile' )

      setProfile(profile)
      setPeople(people)
    }
  })()}, [people,profile])


  useEffect(() => {
    if (route !== '/app/conversations/[chat]') resetShare()
  }, [route])


  const [{ data: conversationData }] = useOnAddConversationSubscription({ variables: { profileID } })
  const [{ data: spoonData }] = useOnAddSpoonSubscription()
  const setChats = useSetRecoilState(ChatAtom)
  const setSpoons = useSetRecoilState(SpoonAtom)

  useEffect(() => {
    if (conversationData?.conversation) {
      const conversations = conversationData?.conversation
      setChats(
        conversations.map( ({ id, profile, conversationParticipants, messages }) => {
          const profiles = [profile, conversationParticipants[0] && conversationParticipants[0].profile]
          const recipient = profiles[0].id === profileID ? profiles[1] : profiles[0]
          const preview = messages.length ? messages[0].content : null
          const unread = true

          return { id, unread, recipient, preview }
        })
      )
    }

    if (spoonData?.spoon) {
      const spoonList = spoonData?.spoon
      // @ts-expect-error
      // firstName should be string but is nullable on backend
      setSpoons(spoonList.map( ({ profile }) => ({ ...profile }) ))
    }
  }, [conversationData,spoonData])


  return (
    // Animate children will unmount on route change
    <Animate>
      <Component {...pageProps} profileID={profileID} />
    </Animate>
  )
}
