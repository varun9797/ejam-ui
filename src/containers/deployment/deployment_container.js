import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './deployment_container.css';
import DeploymentList from '../../components/deploymentlist'

const Counter = (props) => {
    const [deploymentState, setDeploymentState] = useState({
        name: "",
        versions: "",
        url: "",
        id: "",
        templateData: [],
        versionsArray: [],
        showSpinner: false
    })
    useEffect(() => {
            if (props && props.templateObject) {
                let newTemplateObject = props.templateObject.map((value) => {
                    return {
                        value: value.versions, label: value.name
                    }
                })
                console.log("*****");
                setDeploymentState(() => ({
                    ...deploymentState,
                    templateData: newTemplateObject,
                    showSpinner: false
                }))
            }
    }, [props])

    useEffect(()=>{
        props.getTemplateData();
        props.getAllDeployment();
    }, [])

    const deploymenturlChanges = (e) => {
        setDeploymentState({
            ...deploymentState,
            url: e.target.value
        })
    }
    const onDeploymentTemplateSelected = (data) => {
        setDeploymentState({
            ...deploymentState,
            name: data.label,
            versionsArray: data.value,
            versions: ""
        })
    }
    const onDeploymentVersionSelected = (data) => {
        setDeploymentState({
            ...deploymentState,
            versions: data.value
        })
    }
    const onSubmitDeployment = (object) => {
        if (object.name && object.versions && object.url) {
            setDeploymentState({
                ...deploymentState,
                showSpinner: true
            })
            props.onSubmitDeployment(object);
        } else {
            alert("All Fields are required")
        }
    }
    const onDeleteDeployment = (id) => {
        setDeploymentState({
            ...deploymentState,
            showSpinner: true
        })
        props.onDeleteDeployment(id);
    }
    return (
        <div>
            <div className="addControl">
                <div className="row">
                    <div className="col-3">
                        <Dropdown options={deploymentState.templateData} value={deploymentState.name} onChange={onDeploymentTemplateSelected} placeholder="Select Template" /></div>
                    <div className="col-3">
                        <Dropdown options={deploymentState.versionsArray} value={deploymentState.versions} onChange={onDeploymentVersionSelected} placeholder="Select Version" />
                    </div>
                    <div className="col-3 form-group">
                        <input className="form-control" placeholder={'Enter URL'} type="text" value={deploymentState.url} onChange={deploymenturlChanges} /><br />
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" onClick={() => onSubmitDeployment(deploymentState)}>Submit</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="spinner-div">
                {deploymentState.showSpinner ? <div className="loader"></div> : ""}
            </div>
            <ul>
                <div key={'listHeader'} className="showHeaderControl">
                    <div className="row">
                        <div className="col-3">
                            Template Name
                            </div>
                        <div className="col-3">
                            Version Name
                            </div>
                        <div className="col-3">
                            Url
                             </div>
                        <div className="col-3">
                            Action
                            </div>
                    </div>
                </div>
                {props.storedResults.map(strResult => (
                    <DeploymentList key={strResult._id} listProps={strResult}
                        onDeleteDeployment={(id) => onDeleteDeployment(id)}></DeploymentList>
                ))}
            </ul>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        templateObject: state.template.templateData,
        ctr: state.template.counter,
        storedResults: state.deploy.results,
        showSpinner: state.deploy.showSpinner,
        deployedResponse: state.deploy.response
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitDeployment: (stateObj) => dispatch(actionCreators.submitDeployment(stateObj)),
        getTemplateData: () => dispatch(actionCreators.getTemplate()),
        getAllDeployment: () => dispatch(actionCreators.getDeployment()),
        onDeleteDeployment: (id) => dispatch(actionCreators.onDeleteDeployment(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);