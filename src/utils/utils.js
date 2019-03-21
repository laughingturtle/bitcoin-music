export default function BitCoinSocket(){
  console.log('bitCoin Socket running');
  var wsUri = "wss://ws.blockchain.info/inv/";
  var output;
  output = document.getElementById("output");
  testWebSocket();

  function testWebSocket()
  {
    websocket = new WebSocket(wsUri);
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
    //console.log('data = price value: ', data.x.inputs);
    //console.log('data = price value: ', data.x.inputs[0].prev_out.value);
    console.log('raw data: ', data);
    var inputs = data.x.inputs;
    var outputs = data.x.out;
    console.log('inputs', inputs);
    console.log('outputs', outputs);

    for (let i = 0; i < inputs.length; i++){
      console.log('inputs satoshi value: ', inputs[i].prev_out.value);
      console.log('time: ', data.x.time);
      console.log('tx_index: ', data.x.tx_index);
      console.log('// do audio transform on above value');
    }
    for (let i = 0; i < outputs.length; i++){
      console.log('outputs satoshi value: ', outputs[i].value);
      console.log('time: ', data.x.time);
      console.log('tx_index: ', data.x.tx_index);
      console.log('// do audio transform on above value');
    }
    // amount could be hz, but also could be duration, or both.



  // console.log('data = price value: ', data.x.inputs[0].prev_out.value);

  // writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data +'</span>');
  // websocket.close();
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

  //window.addEventListener("load", init, false);

};
