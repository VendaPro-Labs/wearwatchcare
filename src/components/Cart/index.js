import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CartList from './CartList';

import './style.css';

const Cart = ( { itemsTotalCount }) => {

    return (

        <div className="page">
            { itemsTotalCount > 0 ? (
                    <Row className="pageHeader checkoutHeader">
                        <CartList />
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
    }
}

Cart.prototype = {
    itemsTotalCount: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(Cart);
