import * as actionTypes from './action';
import axios from 'axios';
import * as config from "./../../config";
export const getTemplate = () => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: config.HOST_API+'deployment/templates'
        })
            .then(function (response) {
                console.log(response);
                let obj = {
                    type: actionTypes.GET_TEMPLATE,
                    res: response.data
                };
                dispatch(obj);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

};