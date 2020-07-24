import { Title } from '../components/Title'
import { index } from '../styled'
import { logo } from '../svg'
import { rgba, rgb } from 'polished'

export default () => {

  return (
    <>
    <Title>Sapi | Meet your food buddy 😋</Title>
    <index.container>
      <logo.primary as={index.logo} />
      <index.loginButton
        href='/api/login'
        transition={index.transition}
        whileHover={{ backgroundColor: rgba(255, 255, 255, 1), color: rgb(77, 77, 77) }}
        whileTap={{ backgroundColor: rgba(255, 255, 255, 1), color: rgb(77, 77, 77) }}
      >
        Continue
      </index.loginButton>
    </index.container>
    </>
  )
}
