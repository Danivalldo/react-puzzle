import React, { Component } from 'react';
import Game from './components/Game';
import img from './imgs/713f36b9c2e2aca894b2290d8cb788d9.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game size={3} pieceSize={100} img={img} />
      </div>
    );
  }
}

export default App;
