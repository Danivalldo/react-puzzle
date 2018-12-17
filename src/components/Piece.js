import React, { Component } from 'react';
import './piece-style.css';

class Piece extends Component{

	constructor(props){
		super(props);
		this.state = {
			initialRow: props.row,
			initialCol: props.col
		}
	}

	place(){
		return{
			/*
			'top': this.props.row*this.props.size,
			'left': this.props.col*this.props.size,
			*/
			'transform': `translate3d(${this.props.col*this.props.size}px,${this.props.row*this.props.size}px,1px)`,
			'width': this.props.size,
			'height': this.props.size,
			//'backgroundImage': `url('${this.props.img}')`,
			'backgroundSize': `${this.props.size*this.props.numPieces}px ${this.props.size*this.props.numPieces}px`,
			'backgroundPosition': `${-1*this.state.initialCol*this.props.size}px ${-1*this.state.initialRow*this.props.size}px`
		}
	}

	render(){
		return (
			<div id={`${this.props.id}`} className="piece" style={this.place()}>{this.props.id}</div>
		);
	}
}

export default Piece;