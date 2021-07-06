

import React, { Component, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";

import { CARD_TOKEN_STATUS_REQUESTING } from '../../redux/constants';

class SquareMethod extends Component {

    constructor( props) {

        super(props);
        this.cardRef = React.createRef();


        this.state = {
            squarePayment: null,
            squareCard: null,
            squareCardTokenFunc:  async () => {  throw new Error("Not assigned"); },
        }

    }


    requestCardToken =  () => {
        let token ;
        const callBack = ( newToken) => {
            console.log( "Set token", newToken);
            token = newToken;
        }

        const fetchToken = async() => {
            const tokeResult = await this.state.squareCardTokenFunc( callBack);
            console.log("toekn generated", tokeResult);

        }
        fetchToken();


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

}

 export default connect(mapStateToProps)(SquareMethod);
