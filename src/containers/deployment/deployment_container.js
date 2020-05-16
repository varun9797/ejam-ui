import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './deployment_container.css';

class Counter extends Component {
    state = {
        name: "",
        versions: "",
        url: "",
        id: "",
        templateData: [],
        versionsArray: []
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
    }

    deploymentNameChanges = (e) => {
        this.setState({
            name: e.target.value,
            versions:null
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
            versions:""
        })
    }
    onDeploymentVersionSelected = (data) => {
        this.setState({
            versions: data.value
        })
    }
    onSubmitDeployment = (object) => {
        this.props.onSubmitDeployment(object);
    }
    onDeleteDeployment = (id) => {
        this.props.onDeleteDeployment(id);
    }


    render() {
        return (
            <div>
                {/* {JSON.stringify(this.props.deployedResponse)} */}
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
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <div key={strResult._id} className="showControl">
                        <div className="row">
                            <div className="col-3">
                                {strResult.name}
                            </div>
                            <div className="col-3">
                                {strResult.versions}
                            </div>
                            <div className="col-3">
                                {strResult.url}
                            </div>
                            <div className="col-3">
                            <i className="fa fa-close" key={strResult._id} onClick={() => this.onDeleteDeployment(strResult._id)}>
                            </i>
                            </div>
                        </div>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        templateObject: state.ctr.templateData,
        ctr: state.ctr.counter,
        storedResults: state.res.results,
        deployedResponse: state.res.response
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitDeployment: (stateObj) => dispatch(actionCreators.submitDeployment(stateObj)),
        getTemplateData: () => dispatch(actionCreators.getTemplate()),
        getAllDeployment: () => dispatch(actionCreators.getDeployment()),
        onDeleteDeployment:(id) => dispatch(actionCreators.onDeleteDeployment(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);