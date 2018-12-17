import React, { Component } from 'react';
import Piece from './Piece';
import './game-style.css';

class Game extends Component{

	constructor(props){
		super(props);
		this.state = {
			piecesPosition: {},
			emptyPos: {row: 0, col: 0}
		}
		let idNum = 0;
		for(let i=0; i<props.grid; i++){
			for(let j=0; j<props.grid; j++){
				if((this.state.emptyPos.row !== i) || (this.state.emptyPos.col !== j)){
					this.state.piecesPosition[`piece-${idNum}`] = {row: i, col:j, initialRow: i, initialCol:j};
				}
				idNum++;
			}	
		}

		this._handleKeyDown = this.onKeyDown.bind(this);
		window.addEventListener('keydown', this._handleKeyDown);
	}

	componentDidMount(){
		//this.shuffle();
	}

	componentWillUnount(){
		window.removeEventListener('keydown', this._handleKeyDown);
	}

	componentDidUpdate(){
		this.checkSuccess();
	}

	checkSuccess(){
		let wellPlaced = 0;
		for(let k in this.state.piecesPosition){
			const checkingPiece = this.state.piecesPosition[k];
			if((checkingPiece.row === checkingPiece.initialRow) && (checkingPiece.col === checkingPiece.initialCol)){
				wellPlaced++;
			}
		}

		if(wellPlaced === (this.props.grid * this.props.grid)-1){
			alert('Success!');
		}
	}

	onKeyDown(e){
		this.setState((prevState)=>{
			let nextEmptyPos = {...prevState.emptyPos};
			let nextPiecesPosition = {...prevState.piecesPosition};
			switch(e.code){
				case 'ArrowUp':
					nextEmptyPos.row = (nextEmptyPos.row < this.props.grid-1)?nextEmptyPos.row+1:nextEmptyPos.row;
				break;
				case 'ArrowDown':
					nextEmptyPos.row = (nextEmptyPos.row > 0)?nextEmptyPos.row-1:nextEmptyPos.row;
				break;
				case 'ArrowRight':
					nextEmptyPos.col = (nextEmptyPos.col > 0)?nextEmptyPos.col-1:nextEmptyPos.col;
				break;
				case 'ArrowLeft':
					nextEmptyPos.col = (nextEmptyPos.col < this.props.grid-1)?nextEmptyPos.col+1:nextEmptyPos.col;
				break;
				default:
					return;
			}

			e.preventDefault();

			for(let k in nextPiecesPosition){
				if((nextPiecesPosition[k].row === nextEmptyPos.row) && (nextPiecesPosition[k].col === nextEmptyPos.col)){
					nextPiecesPosition[k] = {...prevState.piecesPosition[k], row: prevState.emptyPos.row, col: prevState.emptyPos.col};
					break;
				}
			}

			return{
				emptyPos: nextEmptyPos,
				piecesPosition: nextPiecesPosition
			}
		});
	}

	updatePieces(){
		let pieces = [];

		for(let k in this.state.piecesPosition){
			pieces.push(
				<Piece 
					key={k}
					id={k}
					size={(this.props.size / this.props.grid)}
					col={this.state.piecesPosition[k].col}
					row={this.state.piecesPosition[k].row}
					initialCol={this.state.piecesPosition[k].initialCol}
					initialRow={this.state.piecesPosition[k].initialRow}
					img={this.props.img}
					numPieces={this.props.grid}
				/>
			);
		}

		return pieces;
	}

	shuffle(){
		let ids = Object.keys(this.state.piecesPosition);
		for (let i = ids.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[ids[i], ids[j]] = [ids[j], ids[i]];
		}

		this.setState((prevState)=>{
			let n = 0;
			let nextPiecesPosition = {};
			for(let k in prevState.piecesPosition){
				nextPiecesPosition[k] = {
					...prevState.piecesPosition[ids[n]],
					initialRow: prevState.piecesPosition[k].initialRow,
					initialCol: prevState.piecesPosition[k].initialCol
				};
				n++;
			}
			return {
				piecesPosition: nextPiecesPosition
			}
		})
	}

	render(){
		return (
			<div>
				<div className="game" style={{width: this.props.size, height: this.props.size}}>
					{this.updatePieces()}
				</div>
				<p>
					emptyPos - col:{this.state.emptyPos.col}, row:{this.state.emptyPos.row}
				</p>
				<p>
					<button onClick={this.shuffle.bind(this)}>Shuffle</button>
				</p>
			</div>
		);
	}
}

export default Game;