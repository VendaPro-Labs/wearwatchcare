import {GET_SQUARE_ENVIORNMENT_SUCCESS} from '../constants';

export const getSquareEnvrionmentSuccess= ( squareEnv ) =>{
    return { type: GET_SQUARE_ENVIORNMENT_SUCCESS, payload: { squareEnv} };
}

export const getSquareEnvrionment = () => async(dispatch) => {
    //const backUrl =  `${process.env.REACT_APP_MY_PAYMENT_BACK_URL}/square`;
    const backUrl =  `https://api-payment-wearwatchcare.wn.r.appspot.com/square`;

    try{
        const res = await fetch ( backUrl);
        const squareEnv = await res.json();
        console.log(squareEnv);
        dispatch ( getSquareEnvrionmentSuccess(squareEnv));

    }catch(error) {
        console.log( error);
    }
}