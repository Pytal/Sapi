import { auth0 } from '../../../utils/auth0'
import { getSdk } from '../../../operations/RestaurantOperations'
import { initClient } from '../../../utils/graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

export default auth0.requireAuthentication( async (req: NextApiRequest, res: NextApiResponse) => {
  const { search: searchTerm }: { search: string } = req.body
  const session = await auth0.getSession(req)

  const { SearchRestaurants } = getSdk(initClient(session?.idToken!))
  const { search: results } = await SearchRestaurants({ search: searchTerm })!

  res.json({ results: results?.business })
})
