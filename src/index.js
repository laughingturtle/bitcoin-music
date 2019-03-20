import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // add api datastream
    }

  }

  componentDidMount(){
   // initialize app
  }

  fetchdata(){
    // get datastream
    // axios
  }

  render() {
    return (
      <div>
        <h1>What's up?!</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));