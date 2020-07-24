import { getSdk } from '../operations/UserOperations'
import { initClient } from '../utils/graphql-request'

export const getProfile = async (idToken: string, userID: string) => {
  const { GetProfile } = getSdk(initClient(idToken))
  const { profile_by_pk: profile } = await GetProfile({ userID })

  return { profile }
}
