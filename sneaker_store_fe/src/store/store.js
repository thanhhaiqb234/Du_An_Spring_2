import { createStore, combineReducers } from 'redux';
import { cartReducer } from './reducer/cartReducer';

const rootReducer = combineReducers({
    cartReducer: cartReducer
})

export const store = createStore(rootReducer);
