import React, { Component } from 'react';
import './piece-style.css';

class Piece extends Component{

	place(){
		return{
			'transform': `translate3d(${this.props.col*this.props.size}px,${this.props.row*this.props.size}px,1px)`,
			'width': this.props.size,
			'height': this.props.size,
			'backgroundImage': `url('${this.props.img}')`,
			'backgroundSize': `${this.props.size*this.props.numPieces}px ${this.props.size*this.props.numPieces}px`,
			'backgroundPosition': `${-1*this.props.initialCol*this.props.size}px ${-1*this.props.initialRow*this.props.size}px`
		}
	}

	render(){
		return (
			<div id={`${this.props.id}`} className="piece" style={this.place()}></div>
		);
	}
}

export default Piece;