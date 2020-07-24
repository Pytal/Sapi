import { Title } from '../components/Title'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { AnimatePresence } from 'framer-motion'
import { api } from '../utils/api'
import { signupSchema, currDateStr } from '../utils/validation'
import { signup } from '../styled'
import { rem, rgb, rgba } from 'polished'
import type { ChangeEvent } from 'react'
import type { Variants } from 'framer-motion'
import type { Profile } from '../types/types'


export default () => {
  const router = useRouter()

  const stages = [ 'Name', 'Birthday', 'Gender', 'Bio', 'Complete' ]
  const [stage, setStage] = useState<number>(0)
  const nextStage = () => setStage(stage + 1)

  const [checkedValue, setCheckedValue] = useState<null|string>(null)


  const handleSubmit = async (profile: Profile) => {
    const { addedProfile } = await api.post( 'op/add-profile', profile )
    if (addedProfile) router.push( '/app/home' )
  }

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    if (e.target.type === 'radio') setCheckedValue(e.target.value)
  }


  let vw = 0
  if (typeof window !== 'undefined') vw = document.body.clientWidth

  const stageVariants: Variants = {
    from: { x: rem(vw) },
    in: { x: rem(0) },
    exit: { x: rem(-vw) }
  }


  const [top, setTop] = useState<number>(0)

  useEffect(() => {
    setTop(document.body.clientHeight)
    // @ts-expect-error
    // visualViewport types not yet released: https://github.com/microsoft/TypeScript/issues/37585
    window.visualViewport.onresize = (e) => { setTop(e.target.height) }
  }, [])


  const isStaged = (profile: Profile) => {
    const { firstName, lastName, birthDate, gender, bio } = profile

    const stageValueMap: any = {
      Name: firstName && lastName,
      Birthday: typeof(birthDate) === 'string',
      Gender: gender,
      Bio: bio,
      Complete: Object.values( profile ).every( a => a )
    }

    return stageValueMap[stages[stage]] ? true : false 
  }


  return (
    <>
    <Title>Signup</Title>
    <signup.container>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          // @ts-expect-error
          // incompatible types: Date & string with string
          birthDate: currDateStr,
          gender: '',
          bio: ''
        }}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, values, isSubmitting, submitForm }) => (
          <signup.form onChange={handleChange}>
            <AnimatePresence initial={false} exitBeforeEnter>
              <signup.stageContainer
                variants={stageVariants}
                transition={signup.transition}
                initial={'from'}
                animate={'in'}
                exit={'exit'}
                key={stage}>
                <signup.header>{stages[stage]}</signup.header>
                {stages[stage] === 'Name' ?
                  <>
                  <signup.fieldContainer>
                    <signup.input autoFocus type='text' name='firstName' placeholder='First Name' />
                    <signup.inputHighlight />
                    <signup.errorMsg>{touched.firstName && errors.firstName}</signup.errorMsg>
                  </signup.fieldContainer>
                  <signup.fieldContainer>
                    <signup.input type='text' name='lastName' placeholder='Last Name' />
                    <signup.inputHighlight />
                    <signup.errorMsg>{touched.lastName && errors.lastName}</signup.errorMsg>
                  </signup.fieldContainer>
                  </>
                  : stages[stage] === 'Birthday' ?
                  <signup.fieldContainer>
                    <signup.input autoFocus type='date' name='birthDate' />
                    <signup.inputHighlight />
                    <signup.errorMsg>{touched.birthDate && errors.birthDate}</signup.errorMsg>
                  </signup.fieldContainer>
                  : stages[stage] === 'Gender' ?
                  <>
                  <signup.toggle>
                    <signup.label animate checked={checkedValue === 'male'} >
                      Male <signup.radio type='radio' name='gender' value='male' />
                    </signup.label>
                    <signup.label animate checked={checkedValue === 'female'} >
                      Female <signup.radio type='radio' name='gender' value='female' />
                    </signup.label>
                    <signup.label animate checked={checkedValue === 'other'} >
                      Other <signup.radio type='radio' name='gender' value='other' />
                    </signup.label>
                  </signup.toggle>
                  <signup.errorMsg>{touched.gender && errors.gender}</signup.errorMsg>
                  </>
                  : stages[stage] === 'Bio' ?
                  <signup.fieldContainer>
                    <signup.input autoFocus type='text' name='bio' placeholder='Bio' />
                    <signup.inputHighlight />
                    <signup.errorMsg>{touched.bio && errors.bio}</signup.errorMsg>
                  </signup.fieldContainer>
                  :
                  <signup.fieldContainer>
                    <h1>What a great profile! Ready to get started?</h1>
                  </signup.fieldContainer>
                }
              </signup.stageContainer>
            </AnimatePresence>
            <signup.button
              animate={{
                y: top - (48 + 32),
                opacity: top ? 1 : 0,
                backgroundColor: isStaged(values) ? '#6988F2' : rgb(224, 224, 224),
                boxShadow: isStaged(values) ? `0 0.08rem 0.1rem 0 ${rgba(0,0,0,0.3)}` : `0 0rem 0rem 0 ${rgba(0,0,0,0.3)}`
              }}
              transition={signup.transition}
              onClick={(stages[stage] !== 'Complete') ? _ => { isStaged(values) && nextStage() } : _ => submitForm()}
              disabled={isSubmitting}
              type='button'>
              {(stages[stage] !== 'Complete') ? 'Continue' : `Let's Eat 😋`}
            </signup.button>
          </signup.form>
        )}
      </Formik>
    </signup.container>
    </>
  )
}
