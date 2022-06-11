import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { LogoIcon } from './styles/navigations.styled'

const Logo = ({ toLanding }) => {
  // const navigate = useNavigate()

  // const toLanding = () => {
  //   navigate('/')
  // }

  return (
    <LogoIcon onClick={toLanding} />
  )
}

export default Logo