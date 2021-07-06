import { combineReducers } from 'redux';

import { cartReducer } from './cartReducer';
import { storeReducer } from './storeReducer';
import { squareReducer} from './squareReducer';

const combinedReducers = combineReducers({
    cartReducer,
    storeReducer,
    squareReducer,
});

const rootReducer = (state, action) => {

	return combinedReducers(state, action);
};

export default rootReducer;
