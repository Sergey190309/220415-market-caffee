// import { startLoading } from '../redux/actions/tech';
import { startInitLoading } from '../redux/slices/tech'
import store from '../redux/store';
// import { getTechToken } from '../api/calls/getBackEndInfo';

// (async () => {
//   console.log('init, directly ->', await getTechToken())
// })()
//-------------------------------------------------------------------------
// The dispatch used to emulate connect without component
//-------------------------------------------------------------------------

// console.log('init ->');
store.dispatch(startInitLoading());
// store.dispatch(techInAction());
