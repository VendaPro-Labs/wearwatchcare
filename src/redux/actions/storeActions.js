import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
  } from '../constants';

  export const getProductsSuccess = (products) => {
    return { type: GET_PRODUCTS_SUCCESS, payload: { products } };
  };

  export const getProducts = () => async(dispatch) => {
        const productUrl =  `/mock/products.json`;

        try{
            const res = await fetch ( productUrl);
            const products = await res.json();
            ///console.log(products);
            dispatch ( getProductsSuccess(products));

        }catch(error) {
            console.log( error);
        }
  }