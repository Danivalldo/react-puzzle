import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './piece-style.css';

class Piece extends Component{

	constructor(props){
		super(props);
		this.state = {
			axis: undefined
		};
	}

	handleStart(e, data){
		
	}

	handleDrag(e, data){
		const absDeltaX = Math.abs(data.deltaX);
		const absDeltaY = Math.abs(data.deltaY);
		if(absDeltaX >= 1 || absDeltaY >= 1){
			if(!this.state.axis){
				this.setState(()=>{
					return {
						axis: (absDeltaX > absDeltaY)?'x':'y'
					}
				});
			}
		}
	}

	handleStop(e, data){
		this.setState(()=>{
			return {
				axis: undefined
			}
		});
		// console.log(data.x, data.y, this.props.emptyPos.col*this.props.size, this.props.emptyPos.row*this.props.size);
		if(data.x === this.props.emptyPos.col*this.props.size && data.y === this.props.emptyPos.row * this.props.size){
			if(typeof this.props.onMovedToEmpty === 'function'){
				this.props.onMovedToEmpty(this.props.id);
			}
		}
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
		const pos = {
			x: this.props.col*this.props.size, 
			y: this.props.row*this.props.size
		};

		const bounds = {
			left: (this.props.emptyPos.col === this.props.col-1 && this.props.emptyPos.row === this.props.row)?pos.x - this.props.size:pos.x,
			right: (this.props.emptyPos.col === this.props.col+1 && this.props.emptyPos.row === this.props.row)?pos.x + this.props.size:pos.x,
			top: (this.props.emptyPos.row === this.props.row-1 && this.props.emptyPos.col === this.props.col)?pos.y - this.props.size:pos.y,
			bottom: (this.props.emptyPos.row === this.props.row+1 && this.props.emptyPos.col === this.props.col)?pos.y + this.props.size:pos.y,
		};

		return (
			<Draggable
				axis={this.state.axis}
				onStart={this.handleStart.bind(this)}
    			onDrag={this.handleDrag.bind(this)}
				onStop={this.handleStop.bind(this)}
				bounds={bounds}
				defaultPosition={pos}
				position={pos}
			>
				<div id={`${this.props.id}`} className="piece" style={this.place()}></div>
			</Draggable>
		);
	}
}

export default Piece;