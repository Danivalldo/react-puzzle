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
			sizeGame : (window.innerWidth-this.margin > this.maxSize)?this.maxSize:window.innerWidth-this.margin,
			image: img
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

	handleOnWin(){
		alert('You won!');
	}

	changeImage(img){
		this.setState(()=>{
			return{
				image: img
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
					img={this.state.image}
					onWin={this.handleOnWin.bind(this)}
				/>
				<p>
					<button onClick={this.handleClick.bind(this)}>
						SHUFFLE
					</button>
				</p>
				<p>
					Write your own url image:
					<input
						type="text"
						style={{display:'block', width: '80%', padding: 10, margin: '0 auto'}}
						placeholder="write the Url of an image"
						value={this.state.image}
						onChange={(e)=>{this.changeImage(e.target.value)}}
					/>
				</p>
				<p>
					or select an animated gif: <button onClick={this.changeImage.bind(this, gifImg)}>Launch Gif</button>
				</p>
			</div>
		);
	}
}

export default App;
