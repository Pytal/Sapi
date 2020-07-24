import { auth0 } from '../../utils/auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await auth0.handleLogout(req,res)
}
