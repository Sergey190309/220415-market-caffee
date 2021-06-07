import { stdChannel, runSaga } from 'redux-saga';
import { useState, useEffect, useRef } from 'react';
// import {contentSaga} from './contentLoading'


export const createIO = () => {
  const channel = stdChannel();
  return {
    channel,
    dispatch: action => {
      setImmediate(() => {
        channel.put(action);
      });
    },
  };
};

export const useSaga = (componentSaga, initState) => {
// ----------------------------------------------------------------------------------
  const [state, setState] = useState(initState);
  const IO = useRef(createIO());
  useEffect(() => {
    const task = runSaga(IO.current, componentSaga, setState)
    return () => task.cancel()
  }, [componentSaga])

  return [state, IO.current.dispatch]
};
