import { startInitLoading } from '../redux/slices'
import store from '../redux/store'

store.dispatch(startInitLoading())

console.log('init.js')
