import { signupSchema } from '../utils/validation'
import type * as yup from 'yup'

export interface PageProps {
  profileID: number
}


export interface Chat {
  id: number
  unread: boolean
  recipient: PersonWithID
  preview: string|null
}

export interface Spoon {
  id: number
  firstName: string
  profilePicture: string
}

export interface NearbyPerson {
  id: number
  firstName: string
  profilePicture: string
}

export interface Person {
  firstName: string
  profilePicture: string
}

export interface PersonWithID {
  id: number
  firstName: string|null
  profilePicture: string
}

export interface Share {
  content: string
}


export interface Place {
  label: string
  event?: string
  img: string
  url?: string
  reviews: Review[]
}

export interface RestaurantResult {
  name: string
  photos: string[]
  url: string
  reviews: Review[]
}

export interface Restaurant {
  img: string
  event: string
  reviews: Review[]
}

export interface Review {
  user: { name: string, imageURL: string }
  text: string
}


export type Profile = yup.InferType<typeof signupSchema> & {
  id: number
  profilePicture: string
}

export interface ProfileSnake {
  first_name: string
  last_name: string
  birth_date: string
  gender: string
  bio: string
}
