import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CartList from './CartList';
import _isEmpty from 'lodash.isempty';


import './style.css';
import  PagePaymentSubmitted from '../Pages/PagePaymentSubmited';

const Cart = ( { itemsTotalCount, cardTokenState, paymentCode }) => {

    return (

        <div className="page">
            { itemsTotalCount > 0 ? (
                    <Row className="pageHeader checkoutHeader">
                        <CartList />
                        { cardTokenState === 'CREATED'?
                            (<PagePaymentSubmitted></PagePaymentSubmitted> ):(<div></div>) }
                    </Row>
                ) : (
                    <Row className="pageHeader">
                        <Col xs={12}>
                            <h1 className="pageTitle">There is {itemsTotalCount} item in your cart.</h1>
                        </Col>
                    </Row>
                )

            }
        </div>

    );
}


const mapStateToProps = ( state ) => {
    return {
		itemsTotalCount: state.cartReducer.itemsTotalCount,
        paymentCode: state.cartReducer.paymentResult.code,
        cardTokenState: state.cartReducer.cardTokenState,

    }
}

Cart.prototype = {
    itemsTotalCount: PropTypes.number.isRequired,
    paymentCode: PropTypes.string,
    cardTokenState: PropTypes.string,
}

export default connect(mapStateToProps)(Cart);
