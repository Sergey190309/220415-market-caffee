import React, { useState, useEffect, useRef } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'

const NavBar = ({ visibility, setVisibility }) => {
  const [isVisable, setIsVisable] = useState(visibility)
  const componentRef = useRef(null)

  const closeNav = () => {
    setVisibility(false)
    setIsVisable(false)
  }
  useOutsideClick(componentRef, closeNav)
  return (
    isVisable || visibility ?
      <div ref={componentRef}>NavBar!</div> : null
  )
}

export default NavBar
