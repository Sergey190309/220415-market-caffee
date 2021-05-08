import { getTechToken } from '../api/calls/getBackEndInfo';


(async () => {
  console.log('init, directly ->', await getTechToken())
})()


