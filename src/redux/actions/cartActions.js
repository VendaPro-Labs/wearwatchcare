import _cloneDeep from 'lodash.clonedeep';
import _isEmpty from 'lodash.isempty';

import {
	GET_DISCOUNT_REQUEST,
	GET_DISCOUNT_SUCCESS,
	GET_DISCOUNT_ERROR,
	SET_ORDER_ID,
	REMOVE_ITEM,
	CLEAR_CART,
	INCREMENT_DECREMENT,
	SET_CART,
	GET_TOTALS,
	SET_PAYMENT_METHOD,
	REMOVE_DISCOUNT,
} from '../constants';

export const setCart = (product, qt,type)  => {
   return {type: SET_CART, payload: {product, qt, type}};
}

export const addItemToCart = (id, qt, type='change_count') =>
   (dispatch, getState) => {
        const getItem = (id) => {
           const tempPrdocuts = getState().storeReducer.products;
           const product =   _cloneDeep (tempPrdocuts.find((item) => item.id == id) );
           return product;

        }

        const product = getItem(id);
        if ( product) dispatch( setCart(product, qt, type));
   }


export const getTotals= ()=> {

      return { type: GET_TOTALS };

}