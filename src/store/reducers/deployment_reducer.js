import * as actionTypes from '../actions/action';
import { updateObject } from '../utility.js';

const initialState = {
    results: [],
    response:"",
    showSpinner:false
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SUBMIT_DEPLOYMENT : return updateObject( state, { response: action.res });
        case actionTypes.GET_DEPLOYMENTS : return updateObject( state, { results: action.res, showSpinner:action.showSpinner });
        case actionTypes.DELETE_DEPLOYMENT : return updateObject( state, { response: action.res });
        default : return state;
    }
    
};

export default reducer;