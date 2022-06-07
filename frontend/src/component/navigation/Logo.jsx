import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { LogoIcon } from './styles/navigations.styled'

const Logo = ({ navToLanding }) => {
  // const navigate = useNavigate()

  // const navToLanding = () => {
  //   navigate('/')
  // }

  return (
    <LogoIcon onClick={navToLanding} />
  )
}

export default Logo