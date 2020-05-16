import React, { Component } from 'react';

import DeploymentContainer from './containers/deployment/deployment_container';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <DeploymentContainer />
      </div>
    );
  }
}

export default App;
