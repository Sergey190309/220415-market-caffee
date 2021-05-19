import { v4 } from 'uuid';
import { START_ALERT } from './types';
// import { START_ALERT, SET_ALERT, REMOVE_ALERT } from './types';

export const setAlertData = (incomeData) => {
  const id = v4();
  return {...incomeData, id: id}
}

export const alertActions = alertData => {
  // console.log('actions, alert alertData->', alertData);
  // const id = v4();
  return {
    type: START_ALERT,
    // payload: alertData,
    payload: setAlertData(alertData),
  };
};
