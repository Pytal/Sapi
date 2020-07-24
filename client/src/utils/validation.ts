import * as yup from 'yup'

export const currDateStr = new Date().toISOString().slice(0,10)

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required( 'First Name is required' ),
  lastName: yup
    .string()
    .required( 'Last Name is required' ),
  birthDate: yup
    .date()
    .min( '1900-01-01', 'Birthday must be after January 1, 1900' )
    .max( currDateStr, 'The time travel feature is in development' )
    .required( 'Birthday is required' ),
  gender: yup
    .mixed< 'male'|'female'|'other'|'' >()
    .oneOf([ 'male', 'female', 'other', '' ])
    .required( 'Gender is required' ),
  bio: yup
    .string()
    .required( 'Bio is required' )
})
