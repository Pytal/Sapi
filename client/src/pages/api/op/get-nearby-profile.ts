import { auth0 } from '../../../utils/auth0'
import { getSdk } from '../../../operations/UserOperations'
import { initClient } from '../../../utils/graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

export default auth0.requireAuthentication( async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: { id: number } = req.body
  const session = await auth0.getSession(req)

  const { GetNearbyProfile } = getSdk(initClient(session?.idToken!))
  const { profile } = await GetNearbyProfile({ id })

  res.json({ nearbyProfile: profile[0] })
})
