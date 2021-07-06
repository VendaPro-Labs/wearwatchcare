import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';

import CartItem from './CartItem';

import CartTotals  from './CartTotals';

import PaymentMethod from './PaymentMethod';

const CartList = ({items}) => {
    return (
		<Col className="cartListWrapper">
            <h4>Your Cart</h4>
			<div className="cartWrapper">
                {
                    items.map(
                        item => (
                            <CartItem key={item.id} id={item.id} item={item} />
                        )
                    )
                }
               <PaymentMethod />

               <CartTotals/>
            </div>
        </Col>
    )
}


const mapStateToProps = ( state ) => {
    return {
        items: state.cartReducer.items,
    }
}




export default connect( mapStateToProps) ( CartList);

CartList.propTypes = {
	items: PropTypes.array,
}