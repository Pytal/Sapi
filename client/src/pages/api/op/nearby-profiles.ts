import { auth0 } from '../../../utils/auth0'
import { getSdk } from '../../../operations/UserOperations'
import { initClient } from '../../../utils/graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

export default auth0.requireAuthentication( async (req: NextApiRequest, res: NextApiResponse) => {
  const { profileID }: { profileID: number } = req.body
  const session = await auth0.getSession(req)

  const { GetNearbyProfiles } = getSdk(initClient(session?.idToken!))
  const { profile: nearbyProfiles } = await GetNearbyProfiles({ profileID })

  res.json({ nearbyProfiles })
})
