import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`

export const OptionLink = styled(Link)`
  ${OptionContainerStyles}
`

export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`
