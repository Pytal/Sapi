import { auth0 } from '../../utils/auth0'
import { getProfile } from '../../api-helpers/profile'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await auth0.handleCallback(req,res,{
    redirectTo: '/',
    onUserLoaded: async (req,res,session,state) => {
      // @ts-expect-error
      // profile is nullable on backend
      // but when this api route is called we can be sure that profile is non-null
      const { profile: { id } } = await getProfile(session?.idToken!, session.user.sub)
      return { ...session, user: { ...session.user, profileID: id } }
    }
  })
}
