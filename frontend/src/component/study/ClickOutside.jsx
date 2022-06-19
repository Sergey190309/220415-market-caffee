import React, { useState, useEffect, useRef } from 'react'
import {ColoredDiv} from '../styles/aux.styled'

const ClickOutside = () => {
  const [active, setActive] = useState(false)
  const dropDownAreaRef = useRef(null)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleClickOutside = event => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(dropDownAreaRef.current)) {
      setActive(false);
    }
  }


  return (
    <ColoredDiv
      className={active ? 'active' : ''}
      ref={dropDownAreaRef}
      color='red'
      background='blue'
    >
      Drop Down
    </ColoredDiv>  )
}

export default ClickOutside