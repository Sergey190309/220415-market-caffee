// import { startLoading } from '../redux/actions/tech';
import { startInitLoading } from '../redux/slices'
import store from '../redux/store';

store.dispatch(startInitLoading());
