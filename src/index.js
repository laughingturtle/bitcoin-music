import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import Tone from 'tone';
//import Ws from 'react-websocket';
//import mySum from './utils/plusone';
//import BitCoinSocket from './utils/utils'
import satoshiToNote from './utils/satoshiConversion'

// let synth = new Tone.AMSynth({
//   "harmonicity" : 2.5,
//   "oscillator" : {
//     "type" : "fatsawtooth"
//   },
//   "envelope" : {
//     "attack" : 0.01,
//     "decay" : 0.7,
//     "sustain" : 0.3,
//     "release" : 0.7
//   },
//   "modulation" : {
//     "type" : "sine"
//   },
//   "modulationEnvelope" : {
//     "attack" : 0.5,
//     "decay" : 0.1
//   }
//   }).toMaster();

var synth = new Tone.PolySynth(2, Tone.Synth).toMaster();

//var synth2 = new Tone.PolySynth(3, Tone.Synth).toMaster();


let synth2 = new Tone.AMSynth({
  "harmonicity" : 2.5,
  "oscillator" : {
    "type" : "sine"
  },
  "envelope" : {
    "attack" : 0.01,
    "decay" : 0.7,
    "sustain" : 0.3,
    "release" : 0.7
  },
  "modulation" : {
    "type" : "sine"
  },
  "modulationEnvelope" : {
    "attack" : 0.5,
    "decay" : 0.1
  }
  }).toMaster();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // add api datastream
      ws: new WebSocket('wss://ws.blockchain.info/inv/'),
      //url: 'wss://ws.blockchain.info/inv/',
      startNum: 123534952
    }
    this.bitCoinSocket = this.bitCoinSocket.bind(this);
    //this.synth = this.synth.bind(this);
  }

  componentDidMount(){
    // initialize
    this.bitCoinSocket();
    this.init();
  }

   init(evt){
    document.getElementById('playbutton').addEventListener('click', () => {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      };
    // synth.triggerAttackRelease(satoshiToNote(inputs[i].prev_out.value), "8n");
    //this.synth.triggerAttackRelease("D3", "8n");
    console.log('clicked')
    });
  }

   /////////////////////////-----------------> // Bitcoin API Websocket
   bitCoinSocket(){

    console.log('bitCoin Socket running');
    var websocket;
    var output;
    output = document.getElementById("output");
    testWebSocket();

    function testWebSocket(){
      websocket = new WebSocket('wss://ws.blockchain.info/inv/');
      //websocket = this.state.ws;
      websocket.onopen = function(evt) { onOpen(evt) };
      websocket.onclose = function(evt) { onClose(evt) };
      websocket.onmessage = function(evt) { onMessage(evt) };
      websocket.onerror = function(evt) { onError(evt) };
    }

    function onOpen(evt){
      writeToScreen("CONNECTED");
      doSend(JSON.stringify({"op":"unconfirmed_sub"}));
    }

    function onClose(evt){
      writeToScreen("DISCONNECTED");
    }

    function onMessage(evt){
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
        // make sound here
        synth.triggerAttackRelease(satoshiToNote(inputs[i].prev_out.value), "8n");
      }
      for (let i = 0; i < outputs.length; i++){
        console.log('outputs satoshi value: ', outputs[i].value);
        // console.log('time: ', data.x.time);
        // console.log('tx_index: ', data.x.tx_index);
       // console.log('// do audio transform on above value');
        console.log('** Bitcoin generated note', satoshiToNote(outputs[i].value));
        synth2.triggerAttackRelease(satoshiToNote(outputs[i].value), "8n");
        //make sound here
      }
    }

    function onError(evt){
     console.log('BLOODY BIG API ERROR');
    }

    function doSend(message){
     console.log('MESSAGE SENT TO API')
      websocket.send(message);
    }
  };
  /////////////////////////-----------------> // END Bitcoin API Websocket


  fetchdata(){
    // get datastream
    // axios
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center topPadding">
          <h1>Bitcoin Music</h1>

        </Row>
        <Row className="justify-content-md-center">
          <i class="fas fa-play-circle disable-select" id="playbutton"></i>
          <i class="far fa-pause-circle disable-select" id="pausebutton"></i>
        </Row>
        {/* <Row className="justify-content-md-center d-flex align-items-center">
          <div>visualization here?</div>
        </Row>
        <Row className="justify-content-md-center footer">
          <div>bitcoin donation button here</div>
        </Row> */}
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));