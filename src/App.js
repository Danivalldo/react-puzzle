import React, { Component } from 'react';
import Game from './components/Game';
import img from './imgs/713f36b9c2e2aca894b2290d8cb788d9.jpg';
import gifImg from './imgs/30db44484b1e5d0e2f2531b1005e1449c18b141d_00.gif';

class App extends Component {

	constructor(props){
		super(props);
		this.maxSize = 300;
		this.margin = 0;
		this.state = {
			sizeGame : (window.innerWidth-this.margin > this.maxSize)?this.maxSize:window.innerWidth-this.margin
		}
	}

	componentDidMount(){
		window.addEventListener('resize', this.handleOnResize.bind(this))
	}

	handleClick(){
		this.refs.gameRef.shuffle();
	}

	handleOnResize(){
		this.setState(()=>{
			return{
				sizeGame : (window.innerWidth-this.margin > this.maxSize)?this.maxSize:window.innerWidth-this.margin
			}
		})
	}

	render() {
		return (
			<div className="App">
				<Game
					ref="gameRef"
					grid={3}
					size={this.state.sizeGame}
					img={img}
					onWin={()=>{alert('YOU WON!')}}
				/>
				<p>
					<button onClick={this.handleClick.bind(this)}>
						SHUFFLE
					</button>
				</p>
			</div>
		);
	}
}

export default App;
