import { atom } from 'recoil'
import type {
  Chat,
  Spoon,
  NearbyPerson,
  Person,
  Profile,
  Restaurant,
  Share
} from '../types/types'


export const ChatAtom = atom<null|Chat[]>({
  key: 'Chat',
  default: null
})

export const SpoonAtom = atom<null|Spoon[]>({
  key: 'Spoon',
  default: null
})

export const PeopleAtom = atom<null|NearbyPerson[]>({
  key: 'People',
  default: null
})

export const PersonAtom = atom<null|Person>({
  key: 'Person',
  default: null
})

export const ProfileAtom = atom<null|Profile>({
  key: 'Profile',
  default: null
})

export const RestaurantAtom = atom<null|Restaurant>({
  key: 'Restaurant',
  default: null
})

export const ShareAtom = atom<null|Share>({
  key: 'Share',
  default: null
})
