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
   SET_CARD_PRE_REQUEST,
   STE_CARD_TOKEN_CREATED,
   SET_CARD_PAYMENT_REPLIED,

} from '../constants';

export const setCart = (product, qt,type)  => {
   return {type: SET_CART, payload: {product, qt, type}};
}
// Card Pay
// Step 1
export const setCardPreRequest= () => {
    return {type: SET_CARD_PRE_REQUEST, payload: { cardToken: '' }};
}

// Step 2
export const setCardTokenGenerated= (token) => {
   return {type: STE_CARD_TOKEN_CREATED, payload: { cardToken: token }};
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Step 3
export const setCardPaymentRequest = ( token ) => async (dispatch, getState) => {
   //Make payment to API
   const cart = getState().cartReducer;
   const paymentRequest = {
      items: cart.items,
      totalAmount: cart.totalAmount,
      token: token,
   }

   const jsonBody = JSON.stringify( paymentRequest);

      //Sleep ....
      delay ( 3000);

      const PAY_URL= 'http://localhost:8080'
      fetch (PAY_URL+'/process-payment',
        { method: 'POSt',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'         },
         body: jsonBody,
        }
      )
      .then( response => response.json() )
      .then ( data => {
            console.log( data);
            const {code, message, refId, status} = data;
            dispatch ( {type: SET_CARD_PAYMENT_REPLIED, payload: data} );
      } )
      .catch( error => {
          console.log( error);
         dispatch ( {type: SET_CARD_PAYMENT_REPLIED, payload: {code: 'FAILURE', message: error}} );
      });


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


export const cartCardPreRequest = () =>
      ( dispatch, getState ) => {
         console.log(" Now in cartCardPreRequest ");
         dispatch( setCardPreRequest() );
      }