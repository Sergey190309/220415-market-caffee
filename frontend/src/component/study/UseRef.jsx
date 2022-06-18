import React, { useRef, useState } from 'react'


const UseRef = () => {
  const countRef = useRef(0)
  const [count, setCount] = useState(0)

  const handleRef = () => {
    countRef.current++
    console.log(`Clicked useRef ${countRef.current} times.`)
  }

  const handleState = () => {
    const updatedCount = count + 1
    console.log(`Clicked useState ${updatedCount} times.`)
    setCount(updatedCount)
  }

  console.log('I rendered')

  return (
    <div>
      <button onClick={handleRef}>Click useRef</button>
      <button onClick={handleState}>Click useState</button>
    </div>
  )
}

export default UseRef