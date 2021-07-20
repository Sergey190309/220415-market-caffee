// import { startLoading } from '../redux/actions/tech';
import { startInitLoading } from '../redux/slices/tech'
import store from '../redux/store';

store.dispatch(startInitLoading());
