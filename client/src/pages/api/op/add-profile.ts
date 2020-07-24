import { auth0 } from '../../../utils/auth0'
import { toSnakeKeys } from '../../../utils/case'
import { getSdk } from '../../../operations/UserOperations'
import { initClient } from '../../../utils/graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ProfileSnake } from '../../../types/types'

export default auth0.requireAuthentication( async (req: NextApiRequest, res: NextApiResponse) => {
  const profile: ProfileSnake = toSnakeKeys(req.body)
  const session = await auth0.getSession(req)
  const { user: { sub: userID } } = session!

  const { AddProfile } = getSdk(initClient(session?.idToken!))
  const { update_profile_by_pk } = await AddProfile({ userID, profile })

  const addedProfile = Boolean(update_profile_by_pk)

  res.json({ addedProfile })
})
