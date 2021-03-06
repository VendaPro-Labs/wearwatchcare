

import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


import { CARD_TOKEN_STATUS_REQUESTING } from '../../redux/constants';

import { setCardTokenGenerated,setCardPaymentRequest }  from '../../redux/actions/cartActions';



class SquareMethod extends Component {


    constructor( props) {

        super(props)
        this.cardRef = React.createRef();


        this.state = {
            squarePayment: null,
            squareCard: null,
            squareCardTokenFunc:  async () => {  throw new Error("Not assigned"); },
        }

    }

    // Hook function to call state function ( where to get card token ) upon CARD_TOKEN_STATUS_REQUESTING
    requestCardToken =  () => {

        //For test purpose, a Call back is the poing where token created
        let token ;
        const callBack = ( newToken) => {
            console.log( "Set token", newToken);
            token = newToken;
            this.props.dispatch( setCardTokenGenerated(token) );
            this.props.dispatch( setCardPaymentRequest(token) );

            this.goPaymentSubmittedPage();
        }

        //async/wait
        const fetchToken = async() => {
            const tokeResult = await this.state.squareCardTokenFunc( callBack);
            console.log("toekn generated", tokeResult);

        }
        fetchToken();

    }

    goPaymentSubmittedPage = ()=> {

        this.props.history.push('/paymentsubmitted');


    }

    componentWillMount() {


    }

    componentDidMount() {
        try{
            console.log ( this.props.squareEnv);
            const squarev = window.Square;
            const squarePaymentCreated = squarev.payments(this.props.squareEnv.appId, this.props.squareEnv.locationId);

            this.setState(
                (prevState) => {
                    return {
                    ...prevState,
                    squarePayment: squarePaymentCreated,
                    }
                } );



            console.log("Created");



            squarePaymentCreated.card({
                style: {
                  '.input-container.is-focus': {
                    borderColor: '#006AFF'
                  },
                  '.message-text.is-error': {
                    color: '#BF0020'
                  }
                }
              }).then (
                  (result) => {
                    const squareCard = result;


                    this.setState(
                        (prevState) => {
                            return {
                            ...prevState,
                            squareCard: result,
                            }
                        } );



                    async function cardTokenGet ( callback ) {
                        const tokenResult = await squareCard.tokenize();
                        console.log(" token status",  tokenResult.status);
                        if (tokenResult.status === 'OK') {
                            console.log( callback );
                          if ( callback)
                            callback(tokenResult.token);
                          return tokenResult.token;
                        } else {
                          let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
                          if (tokenResult.errors) {
                            errorMessage += ` and errors: ${JSON.stringify(
                              tokenResult.errors
                            )}`;
                          }
                          console.log( errorMessage);

                          throw new Error(errorMessage);
                        }
                    }

                    // When call back function set, all setState joined/returned
                    this.setState(
                        (prevState) => {
                            return {
                            ...prevState,
                            squareCardTokenFunc: cardTokenGet,
                            }
                        } , ()=> { console.log( this.state)});

                    squareCard.attach(this.cardRef.current);


                    }, (err) =>{
                      console.log(err);
                  }
              );

              console.log( this.state);

          } catch(error) {
              console.log(error);
          }

    }

    componentWillReceiveProps(nextProps) {
        console.log( "componentWillReceiveProps" , nextProps.cardTokenState);

    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log( "shouldComponentUpdate", nextProps.cardTokenState);

        return true;
    }

    // Triggred by Store state->CARD_TOKEN_STATUS_REQUESTING communicated from component CarTotals Pay Now
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate", nextProps.cardTokenState);
        if (nextProps.cardTokenState === CARD_TOKEN_STATUS_REQUESTING ) {
            try{
                const token =  this.requestCardToken();
                console.log( token);
            }catch(error) {
                console.log( error )
            }
        }

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div> {this.props.cardTokenState}
            <div id="payCard" ref={this.cardRef}>
                   { this.state.squareCard == null ?
                            (<Spinner animation="border" rolw="status">
                                <span className="sr-only">...</span>

                            </Spinner> )
                      : ( <div/>)
                   }
            </div>
        </div>
        )
    }
}


const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        squareEnv: state.squareReducer.squareEnv,
        cardTokenState: state.cartReducer.cardTokenState,
    };
  }


SquareMethod.propTypes = {
    dispatch: PropTypes.func.isRequired,
    squareEnv: PropTypes.object.isRequired,
    squarePayment: PropTypes.object,
    squareCard: PropTypes.object,
    cardTokenState: PropTypes.string,

}

 export default connect(mapStateToProps)(withRouter(SquareMethod));
