import {
	INCREMENT_DECREMENT,
	SET_CART,
	GET_DISCOUNT_ERROR,
	CLEAR_CART,
	GET_DISCOUNT_SUCCESS,
	GET_DISCOUNT_REQUEST,
	SET_ORDER_ID,
	GET_TOTALS,
	REMOVE_ITEM,
	SET_PAYMENT_METHOD,
	REMOVE_DISCOUNT,
	SET_CARD_PRE_REQUEST,
	CARD_TOKEN_STATUS_UNKNOWN,
	CARD_TOKEN_STATUS_REQUESTING,
	CARD_TOKEN_STATUS_GENERATED,
} from '../constants';

import _cloneDeep from 'lodash.clonedeep';


const initialState = {
	items: [],
	productRewards: [],
	totalAmount: 0,
	itemsTotalCount: 0,
	totalAmountAfterDiscount: 0,
	discountedAmount: 0,
	orderId: null,
	discount: null,
	paymentMethod: 'Other',
	cardToken:'',
	cardTokenState:CARD_TOKEN_STATUS_UNKNOWN,
};


export const cartReducer = (state = initialState, action) => {

    switch ( action.type) {
        case GET_TOTALS: {
            const { totalAmount, itemsTotalCount } = state.items.reduce(
				(items, currentItem) => {
					const { price, count } = currentItem;
					const itemTotalAmount = price * count;
					items.totalAmount += itemTotalAmount;
					items.itemsTotalCount += count;
					return items;
				},
				{
					totalAmount: 0,
					itemsTotalCount: 0,
				}
			);

            return {
                ...state,
                totalAmount,
                itemsTotalCount,
            }
        }
        case SET_CART: {
            const product = action.payload.product;
            const quantity = parseInt(action.payload.qt, 10);
			const items = [...state.items];
			const item = _cloneDeep(items.find((item) => item.id === product.id));
			if (item) {
				const selectedProduct = items.find((item) => item.id === product.id);
				if (action.payload.type === 'increment_count') {
					selectedProduct.count += quantity;
				} else {
					selectedProduct.count = quantity;
				}
				selectedProduct.total = selectedProduct.price * selectedProduct.count;
				return { ...state, items: items };
			} else {
				return {
					...state,
					items: [
						...state.items,
						{
							...product,
							count: quantity,
							total: product.price * quantity,
						},
					],
				};
			}
		}
		case SET_CARD_PRE_REQUEST: {
			console.log("Reduce SET_CARD_PRE_REQUEST ");
			return {
				...state,
				cardToken: action.payload.cardToken,
				cardTokenState:CARD_TOKEN_STATUS_REQUESTING,
			}
		}
        default: {
            return {
                ...state,
            }
        }
    }


}

export default cartReducer;