import { auth0 } from '../../../utils/auth0'
import { getSdk } from '../../../operations/ConversationOperations'
import { initClient } from '../../../utils/graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

export default auth0.requireAuthentication( async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth0.getSession(req)
  const { user: { profileID } } = session!

  const { AddConversation } = getSdk(initClient(session?.idToken!))
  const { insert_conversation_one } = await AddConversation({ profileID })

  res.json({ conversationID: insert_conversation_one?.id })
})
