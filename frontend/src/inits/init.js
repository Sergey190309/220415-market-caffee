import { startInitLoading } from '../redux/slices'
import store from '../redux/store'
// console.log('init.js')

store.dispatch(startInitLoading())

