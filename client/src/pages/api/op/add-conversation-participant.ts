import { auth0 } from '../../../utils/auth0'
import { getSdk } from '../../../operations/ConversationOperations'
import { initClient } from '../../../utils/graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

export default auth0.requireAuthentication( async (req: NextApiRequest, res: NextApiResponse) => {
  const { conversationID, participantID } = req.body
  const session = await auth0.getSession(req)

  const { AddConversationParticipant } = getSdk(initClient(session?.idToken!))
  const { insert_conversation_participant_one } = await AddConversationParticipant({ conversationID, participantID })

  res.json({ addedConversationParticipant: insert_conversation_participant_one?.conversationID ? true : false })
})
