import { combineReducers } from 'redux';

import { cartReducer } from './cartReducer';
import { storeReducer } from './storeReducer';

const combinedReducers = combineReducers({
    cartReducer,
    storeReducer,
});

const rootReducer = (state, action) => {

	return combinedReducers(state, action);
};

export default rootReducer;
