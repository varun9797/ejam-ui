import * as actionTypes from '../actions/action';
import { updateObject } from '../utility';

const initialState = {
    counter: 0,
    templateData:[]
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_TEMPLATE : 
            return updateObject( state, { templateData: action.res });
        default : return state;
    } 
};

export default reducer;