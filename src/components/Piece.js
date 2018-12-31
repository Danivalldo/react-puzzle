import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './piece-style.css';

class Piece extends Component{

	handleStart(){
		console.log('start');
	}

	handleDrag(){

	}

	handleStop(){
		console.log('stop');
	}

	place(){
		return{
			//'transform': `translate3d(${this.props.col*this.props.size}px,${this.props.row*this.props.size}px,1px)`,
			'width': this.props.size,
			'height': this.props.size,
			'backgroundImage': `url('${this.props.img}')`,
			'backgroundSize': `${this.props.size*this.props.numPieces}px ${this.props.size*this.props.numPieces}px`,
			'backgroundPosition': `${-1*this.props.initialCol*this.props.size}px ${-1*this.props.initialRow*this.props.size}px`
		}
	}

	render(){
		return (
			<Draggable
				onStart={this.handleStart.bind(this)}
    			onDrag={this.handleDrag.bind(this)}
				onStop={this.handleStop.bind(this)}
				axis="x"
				defaultPosition={{x: this.props.col*this.props.size, y: this.props.row*this.props.size}}
				position={{x: this.props.col*this.props.size, y: this.props.row*this.props.size}}
			>
				<div id={`${this.props.id}`} className="piece" style={this.place()}></div>
			</Draggable>
		);
	}
}

export default Piece;