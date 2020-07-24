import { styled } from 'linaria/react'
import { app } from '../../styled'

export interface SvgProps {
  as: ReturnType<typeof styled.svg>
}

export interface NavBarSvgProps {
  as: typeof app.navIcon
  selected: boolean
}
