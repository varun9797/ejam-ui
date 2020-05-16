import * as actionTypes from './action';
import axios from 'axios';
export const getTemplate = () => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: 'http://ejam-api.us-east-1.elasticbeanstalk.com/deployment/templates'
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