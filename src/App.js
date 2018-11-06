import React, { Component } from 'react';
import './App.css';

import CameraScreen from './CameraScreen'
import ReceiptScreen from './ReceiptScreen'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <ReceiptScreen/>
      </div>
    );
  }
}



export default App;
