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
      ws: new WebSocket('wss://ws.blockchain.info/inv/'),
      url: 'wss://ws.blockchain.info/inv/',
      startNum: 123534952
    }
    this.bitCoinSocket = this.bitCoinSocket.bind(this);
  }

  componentDidMount(){
    // initialize app
    console.log('my note inside react', satoshiToNote(this.state.startNum));
    //this.setupWebsocket();
    this.bitCoinSocket();
   }

   /////////////////////////-----------------> // Bitcoin Websocket
   bitCoinSocket(){
    console.log('bitCoin Socket running');
    //var wsUri = "wss://ws.blockchain.info/inv/";
    var websocket;
    var output;
    output = document.getElementById("output");
    testWebSocket();


    function testWebSocket()
    {
      websocket = new WebSocket('wss://ws.blockchain.info/inv/');
      websocket.onopen = function(evt) { onOpen(evt) };
      websocket.onclose = function(evt) { onClose(evt) };
      websocket.onmessage = function(evt) { onMessage(evt) };
      websocket.onerror = function(evt) { onError(evt) };
    }

    function onOpen(evt)
    {
      writeToScreen("CONNECTED");
      doSend(JSON.stringify({"op":"unconfirmed_sub"}));
    }

    function onClose(evt)
    {
      writeToScreen("DISCONNECTED");
    }

    function onMessage(evt)
    {
      var data = JSON.parse(evt.data);
      // console.log('raw data: ', data);
      var inputs = data.x.inputs;
      var outputs = data.x.out;
      // console.log('inputs', inputs);
      // console.log('outputs', outputs);

      for (let i = 0; i < inputs.length; i++){
        console.log('inputs satoshi value: ', inputs[i].prev_out.value);
        // console.log('time: ', data.x.time);
        // console.log('tx_index: ', data.x.tx_index);
        //console.log('// do audio transform on above value');
        console.log('** Bitcoin generated note', satoshiToNote(inputs[i].prev_out.value));
      }
      for (let i = 0; i < outputs.length; i++){
        console.log('outputs satoshi value: ', outputs[i].value);
        // console.log('time: ', data.x.time);
        // console.log('tx_index: ', data.x.tx_index);
       // console.log('// do audio transform on above value');
        console.log('** Bitcoin generated note', satoshiToNote(outputs[i].value));
      }
    }

    function onError(evt)
    {
      writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function doSend(message)
    {
      writeToScreen("SENT: " + JSON.stringify(message));
      websocket.send(message);
    }

    function writeToScreen(message)
    {
      var pre = document.createElement("p");
      pre.style.wordWrap = "break-word";
      pre.innerHTML = message;
      output.appendChild(pre);
    }
  };
  /////////////////////////-----------------> // END Bitcoin Websocket


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