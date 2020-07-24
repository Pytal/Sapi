import { auth0 } from '../../../utils/auth0'
import { getProfile } from '../../../api-helpers/profile'
import type { NextApiRequest, NextApiResponse } from 'next'

export default auth0.requireAuthentication( async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth0.getSession(req)
  const { user: { sub: userID } } = session!

  let { profile } = await getProfile(session?.idToken!, userID)

  res.json({ profile })
})
