import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const setFromEvent = event => setPosition({
      x: event.clientX,
      y: event.clientY
    })
    window.addEventListener('mousemove', setFromEvent)
    return () => {
      window.removeEventListener('mousemove', setFromEvent)
    }
  }, [])
  return position
}
