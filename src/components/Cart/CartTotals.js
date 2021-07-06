import React, { useEffect } from 'react';


import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import {cartCardPreRequest} from '../../redux/actions/cartActions'

const CartTotals = ({dispatch, totalAmount}) => {


    const totalAmontDisplay = `$${  ( totalAmount / 100).toFixed(2)  }`

    return (
        <Row className="totalSection" noGutters={true}>
			<Col xs={12} sm={4} md={4} className="sectionTitle">
				Order total
			</Col>
			<Col xs={12} sm={4} md={4} className="totalAmount">
				{totalAmontDisplay}
			</Col>
			<Col xs={10} sm={3} md={3}>
					<Button onClick={ async () => { console.log("Clicked"); await dispatch(cartCardPreRequest()) } }
						className="voucherifyButtonDark paymentButton"

					>
						Pay now -
					</Button>
			</Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        totalAmount: state.cartReducer.totalAmount,
    }
}

CartTotals.propTypes = {
    dispatch: PropTypes.func,
    totalAmount: PropTypes.number,
}

export default connect(mapStateToProps)(CartTotals);
