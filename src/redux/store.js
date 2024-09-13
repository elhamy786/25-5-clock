import { createStore } from 'redux';
import clockReducer from './reducers';

const store = createStore(clockReducer);

export default store;
