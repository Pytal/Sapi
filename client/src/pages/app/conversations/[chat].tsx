import { Title } from '../../../components/Title'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { PersonAtom, ShareAtom } from '../../../atoms/Atoms'
import { useGetChatProfilesQuery, useOnAddMessageSubscription, useAddMessageMutation } from '../../../operations/ConversationOperations'
import { chat } from '../../../styled'
import type { PersonWithID, PageProps } from '../../../types/types'


export default ({ profileID }: PageProps) => {
  const { query: { chat: conversationID } } = useRouter()

  const setPerson = useSetRecoilState(PersonAtom)
  const share = useRecoilValue(ShareAtom)

  const [{ data: chatContext, error: chatContextErrors }] = useGetChatProfilesQuery({ variables: { conversationID: Number(conversationID) } })
  const [{ data: subData, error: subErrors }] = useOnAddMessageSubscription({ variables: { conversationID: Number(conversationID) } })
  const [{ data, error: errors }, addMessage] = useAddMessageMutation()

  const [recipient, setRecipient] = useState<null|PersonWithID>(null)

  const messageInputRef = useRef<null|HTMLDivElement>(null)

  useEffect(() => {
    if (chatContext?.conversation_by_pk) {
      const profiles = [chatContext.conversation_by_pk.profile, chatContext.conversation_by_pk.conversationParticipants[0].profile]
      setRecipient(profiles[0].id === profileID ? profiles[1] : profiles[0] as any)
    }

  }, [
    chatContext, chatContextErrors,
    data, errors,
    subData, subErrors
  ])


  const handleMessage = (e: any) => {
    if ( (e.key === 'Enter' && !e.shiftKey) || e.type === 'click') {
      e.preventDefault()

      if (messageInputRef.current?.textContent) {
        addMessage({
          conversationID: Number(conversationID),
          senderID: profileID,
          content: messageInputRef.current?.textContent
        })

        messageInputRef.current!.textContent = null
      }
    }
  }


  return (
    <>
    <Title>{`Conversation with ${recipient?.firstName}`}</Title>
    <chat.banner>
      <Link href='/app/people/[person]' as={`/app/people/${recipient?.id}`}>
        <chat.labelImg
          onClick={_ => setPerson({ firstName: recipient?.firstName ?? '', profilePicture: recipient?.profilePicture ?? '' })}
          src={recipient?.profilePicture} />
      </Link>
      <Link href='/app/people/[person]' as={`/app/people/${recipient?.id}`}>
        <chat.label
          onClick={_ => setPerson({ firstName: recipient?.firstName ?? '', profilePicture: recipient?.profilePicture ?? '' })}>
          {recipient?.firstName}
        </chat.label>
      </Link>
    </chat.banner>
    <chat.container>
      <chat.thread>
        {subData?.message.map( ({ senderID, content },i) =>
          (senderID !== profileID) ?
            <chat.message key={i}>
              <chat.messageImg src={recipient?.profilePicture} />
              <chat.messageContent>{content}</chat.messageContent>
            </chat.message>
            :
            <chat.sentMessage key={i}>
              <chat.sentMessageContent>{content}</chat.sentMessageContent>
            </chat.sentMessage>
        )}
      </chat.thread>
      <chat.messageBox>
        <chat.messageInput
          contentEditable
          suppressContentEditableWarning
          autoFocus
          placeholder='Type a message'
          onKeyDown={handleMessage}
          ref={messageInputRef}>
          {share?.content}
        </chat.messageInput>
        <chat.messageSendIcon
          onClick={handleMessage}
          viewBox="0 0 300 300">
          <path d="M300,150a20,20,0,0,0-11.13-17.91h0L30.91,3.24h0A20,20,0,0,0,2,28.66v0H2l30.4,67.44h0a20,20,0,0,0,37.72-5,19.63,19.63,0,0,0-1-10.64h0L69,80.17a17.28,17.28,0,0,0-.71-1.58l-6.1-13.54a2.71,2.71,0,0,1,3.7-3.52l166.63,85.61a3.21,3.21,0,0,1,0,5.72L62,240.5a1.56,1.56,0,0,1-2.14-2l28-64.51A6.63,6.63,0,0,1,94,170h55.59c10.42,0,19.45-7.8,20.37-18.18A20,20,0,0,0,150,130H76.48a20,20,0,0,0-18.7,13h0L2,271.32v0a19.85,19.85,0,0,0-1.7,12.08A20,20,0,0,0,30.9,296.76h0L288.85,167.91c.27-.13.54-.25.8-.39l.11-.06h0A20,20,0,0,0,300,150Z" />
        </chat.messageSendIcon>
      </chat.messageBox>
    </chat.container>
    </>
  )
}
