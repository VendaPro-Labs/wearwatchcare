import {
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
  } from '../constants';

const initialState = {
    products: [],
}
export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                products: action.payload.products,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default storeReducer;