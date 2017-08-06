import React, { Component } from 'react';
import hat from './hat.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={hat} className="App-logo" alt="logo" />
          <h2>Welcome to the Story Hat</h2>
        </div>
        <p className="App-intro">
          Soon this is going to be awesome.
        </p>
      </div>
    );
  }
}

export default App;
