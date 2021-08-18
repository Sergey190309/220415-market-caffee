import { stdChannel, runSaga } from 'redux-saga'
import { useState, useEffect, useRef } from 'react'
// import {contentSaga} from './contentLoading'

export const createIO = () => {
  const channel = stdChannel()
  return {
    channel,
    dispatch: action => {
      setImmediate(() => {
        channel.put(action)
      })
    }
  }
}

export const useSaga = (saga, initState) => {
  const [state, setState] = useState(initState)
  const IO = useRef(createIO())
  useEffect(() => {
    // console.log('useSaga, useEffect, saga  ->', saga)
    const task = runSaga(IO.current, saga, setState)
    return () => task.cancel()
  }, [saga])

  return [state, IO.current.dispatch]
}
