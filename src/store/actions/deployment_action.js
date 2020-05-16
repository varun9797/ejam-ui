import * as actionTypes from './action';
import axios from 'axios';
import * as actionCreators from '../../store/actions/index';
import * as config from './../../config'

export const submitDeployment = (obj) => {
    return (dispatch, getState) => {
        axios({
            method: 'post',
            url: config.HOST_API+'deployment/list',
            data: {
                "name": obj.name,
                "versions": obj.versions,
                "url": obj.url
            },
        })
            .then(function (response) {
                console.log(response);
                dispatch(actionCreators.getDeployment())
            })
            .catch(function (response) {
                console.log(response);
            });
    }

};

export const onDeleteDeployment = (id) => {
    return (dispatch, getState) => {
        axios({
            method: 'delete',
            url: config.HOST_API+'deployment/list',
            data: { _id: id }

        })
            .then(function (response) {
                console.log(response);
                dispatch(actionCreators.getDeployment())
            })
            .catch(function (response) {
                console.log(response);
            });
    }

};


export const getDeployment = () => {
    return (dispatch, getState) => {
        axios({
            method: 'get',
            url: config.HOST_API+'deployment/list'
        })
            .then(function (response) {
                console.log(response);
                let obj1 = {
                    type: actionTypes.GET_DEPLOYMENTS,
                    res: response.data
                };
                dispatch(obj1);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

};


