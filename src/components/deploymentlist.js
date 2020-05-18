import React from 'react'

const deploymentList = (props) => {
    return (
        <div key={props.listProps._id} className="showControl">
            
            <div className="row">
                <div className="col-3">
                    {props.listProps.name}
                </div>
                <div className="col-3">
                    {props.listProps.versions}
                </div>
                <div className="col-3">
                    {props.listProps.url}
                </div>
                <div className="col-3">
                    <i className="fa fa-close" onClick={() => props.onDeleteDeployment(props.listProps._id)}>
                    </i>
                </div>
            </div>
        </div>
    )
}


export default deploymentList;