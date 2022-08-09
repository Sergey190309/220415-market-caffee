// import { useState, useEffect, useRef } from 'react'
import { useAppState, useAppEffect, useAppRef } from '../../hooks/react'
import { stdChannel, runSaga } from 'redux-saga'


export const createIO = () => {
  const channel = stdChannel()
  return {
    channel,
    dispatch: action => {
      setTimeout(() => { channel.put(action) }, 0)
      // setImmediate(() => {
      //   channel.put(action)
      // })
    }
  }
}

export const useSaga = (saga, initState) => {
  const [state, setState] = useAppState(initState)
  const IO = useAppRef(createIO())
  useAppEffect(() => {
    // console.log('useSaga, useEffect, saga  ->', saga)
    const task = runSaga(IO.current, saga, setState)
    return () => task.cancel()
  }, [saga])

  return [state, IO.current.dispatch]
}
