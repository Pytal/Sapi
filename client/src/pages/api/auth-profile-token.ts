import { auth0 } from '../../utils/auth0'
import { getProfile } from '../../api-helpers/profile'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth0.getSession(req)
  const isAuthenticated = session ? true : false
  let hasProfile = false
  let token: null|string = null
  let profileID: null|number = null

  if (isAuthenticated) {
    const { user: { sub: userID } } = session!
    const { profile } = await getProfile(session?.idToken!, userID)

    const anyNullField = Object.values( profile! ).some( a => !a )
    hasProfile = !anyNullField
    token = session?.idToken!
    profileID = session?.user.profileID
  }

  res.json({ isAuthenticated, hasProfile, token, profileID })
}
