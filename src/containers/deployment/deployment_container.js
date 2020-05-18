import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './deployment_container.css';
import DeploymentList from '../../components/deploymentlist'

class Counter extends Component {
    state = {
        name: "",
        versions: "",
        url: "",
        id: "",
        templateData: [],
        versionsArray: [],
        showSpinner: false
    }
    componentDidMount() {
        this.props.getTemplateData();
        this.props.getAllDeployment()
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.templateObject) {
            let newTemplateObject = newProps.templateObject.map((value) => {
                return {
                    value: value.versions, label: value.name
                }
            })
            this.setState({ templateData: newTemplateObject })
        }
        if (newProps.showSpinner === false) {
            this.setState({
                showSpinner: false
            })
        }
    }

    deploymentNameChanges = (e) => {
        this.setState({
            name: e.target.value,
            versions: null
        })
    }
    deploymentVersionChanges = (e) => {
        this.setState({
            versions: e.target.value
        })
    }
    deploymenturlChanges = (e) => {
        this.setState({
            url: e.target.value
        })
    }
    onDeploymentTemplateSelected = (data) => {
        this.setState({
            name: data.label,
            versionsArray: data.value,
            versions: ""
        })
    }
    onDeploymentVersionSelected = (data) => {
        this.setState({
            versions: data.value
        })
    }
    onSubmitDeployment = (object) => {
        if (object.name && object.versions && object.url) {
            this.setState({
                showSpinner: true
            })
            this.props.onSubmitDeployment(object);
        } else {
            alert("All Fields are required")
        }
    }
    onDeleteDeployment = (id) => {
        this.setState({
            showSpinner: true
        })
        this.props.onDeleteDeployment(id);
    }


    render() {
        return (
            <div>
                <div className="addControl">
                    <div className="row">
                        <div className="col-3">
                            <Dropdown options={this.state.templateData} value={this.state.name} onChange={this.onDeploymentTemplateSelected} placeholder="Select Template" /></div>
                        <div className="col-3">
                            <Dropdown options={this.state.versionsArray} value={this.state.versions} onChange={this.onDeploymentVersionSelected} placeholder="Select Version" />
                        </div>
                        <div className="col-3 form-group">
                            <input className="form-control" placeholder={'Enter URL'} type="text" value={this.state.url} onChange={this.deploymenturlChanges} /><br />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-success" onClick={() => this.onSubmitDeployment(this.state)}>Submit</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="spinner-div">
                    {this.state.showSpinner ? <div className="loader"></div> : ""}
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
                    {this.props.storedResults.map(strResult => (
                        <DeploymentList key={strResult._id} listProps={strResult}
                            onDeleteDeployment={(id) => this.onDeleteDeployment(id)}></DeploymentList>
                    ))}
                </ul>
            </div>
        );
    }
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