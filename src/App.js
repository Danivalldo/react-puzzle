import React, { Component } from 'react';
import Game from './components/Game';
import img from './imgs/713f36b9c2e2aca894b2290d8cb788d9.jpg';
import gifImg from './imgs/30db44484b1e5d0e2f2531b1005e1449c18b141d_00.gif';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game grid={3} size={300} img={gifImg} />
      </div>
    );
  }
}

export default App;
