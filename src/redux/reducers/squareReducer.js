import { GET_SQUARE_ENVIORNMENT_SUCCESS } from '../constants';


const initialState = {
    squareEnv: {
        locationId: '',
        appId: '',
        currency: '',
        country: '',
    },
}

export const squareReducer = (state = initialState, action)  => {
    switch ( action.type ) {
        case GET_SQUARE_ENVIORNMENT_SUCCESS: {
            const { locationId, appId, currency, country } = action.payload.squareEnv;
            return {
                ...state,
                squareEnv : { locationId, appId, currency, country,}
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
}