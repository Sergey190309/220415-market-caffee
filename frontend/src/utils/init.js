import { techInAction } from '../redux/actions/auth';
import store from '../redux/store';
// import { getTechToken } from '../api/calls/getBackEndInfo';

// (async () => {
//   console.log('init, directly ->', await getTechToken())
// })()
//-------------------------------------------------------------------------
// The dispatch used to emulate connect without component
//-------------------------------------------------------------------------

// console.log('init ->');
store.dispatch(techInAction());
