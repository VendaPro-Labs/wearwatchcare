
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner';
import _isEmpty from 'lodash.isempty';


class PagePaymentSubmited extends Component {



    constructor(props) {
        super(props)


    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log( "PagePaymentSubmited componentWillReceiveProps" , nextProps);

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log( "PagePaymentSubmited shouldComponentUpdate" , nextProps);
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log( "PagePaymentSubmited componentWillUpdate" , nextProps);

    }

    componentDidUpdate(prevProps, prevState) {
        console.log( "PagePaymentSubmited componentWillUpdate" , prevProps);

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="page">
                <Row>
                    <Col>
                        <h6>Payment:{this.props.paymentCode}-</h6>
                    </Col>
                </Row>
             {   _isEmpty(this.props.paymentCode)? (
                    <Row>
                        <Col>
                            <h1 className="pageTitle">In Progressing</h1>
                            <h6>Please wait for the result.</h6>
                            <Spinner animation="border" rolw="status">
                                <span className="sr-only">...</span>

                            </Spinner>
                        </Col>
                    </Row>
                ) : (

                    <Row>
                        <Col>
                            <h1 className="pageTitle">Completed</h1>
                            <h6>Payment Code: { this.props.paymentCode}</h6>
                            <h6>{ this.props.paymentMessage}</h6>
                        </Col>
                    </Row>

                )
            }
           </div>
        )
    }
}

PagePaymentSubmited.propTypes = {
    dispatch: PropTypes.func.isRequired,
    paymentStatus: PropTypes.string,
    paymentCode: PropTypes.string,
    paymentMessage: PropTypes.string,
    paymentStatus: PropTypes.string,
    cardTokenState: PropTypes.string,
}


const mapStateToProps = (state) => {

    return {
        cardTokenState: state.cartReducer.cardTokenState,

        paymentCode: state.cartReducer.paymentResult.code,
        paymentRefId: state.cartReducer.paymentResult.refId,
        paymentMessage: state.cartReducer.paymentResult.message,
        paymentStatus: state.cartReducer.paymentResult.status,
    }
}

export default connect(mapStateToProps)(PagePaymentSubmited);