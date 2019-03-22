import React from 'react';
import ReactDOM from 'react-dom';
//import Ws from 'react-websocket';
//import mySum from './utils/plusone';
//import BitCoinSocket from './utils/utils'
import satoshiToNote from './utils/satoshiConversion'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // add api datastream
      url: 'wss://ws.blockchain.info/inv/',
      startNum: 12353453
    }
    //this.bitCoinSocket = this.bitCoinSocket.bind(this);
  }

  componentDidMount(){
   // initialize app
   // BitCoinSocket();
   satoshiToNote(this.state.startNum);
  }

  fetchdata(){
    // get datastream
    // axios
  }

  render() {
    return (
      <div>
        <h1>What's up?!</h1>

        <h2>WebSocket Test</h2>

        <div id="output"></div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));