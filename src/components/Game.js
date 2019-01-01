import React, { Component } from 'react';
import Piece from './Piece';
import './game-style.css';

class Game extends Component{

	constructor(props){
		super(props);
		this.state = {
			piecesPosition: {},
			emptyPos: {row: 0, col: 0},
			status: 'ready'
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
		if(this.state.status === 'ready'){
			let wellPlaced = 0;
			for(let k in this.state.piecesPosition){
				const checkingPiece = this.state.piecesPosition[k];
				if((checkingPiece.row === checkingPiece.initialRow) && (checkingPiece.col === checkingPiece.initialCol)){
					wellPlaced++;
				}
			}

			if(wellPlaced === (this.props.grid * this.props.grid)-1){
				window.setTimeout(()=>{
					if(typeof this.props.onWin === 'function'){
						this.props.onWin();
					}
				}, 100);
			}
		}
	}

	onKeyDown(e){
		this.setState((prevState)=>{
			let nextEmptyPos = {...prevState.emptyPos};
			let nextPiecesPosition = undefined;
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
			/*
			for(let k in nextPiecesPosition){
				if((nextPiecesPosition[k].row === nextEmptyPos.row) && (nextPiecesPosition[k].col === nextEmptyPos.col)){
					nextPiecesPosition[k] = {...prevState.piecesPosition[k], row: prevState.emptyPos.row, col: prevState.emptyPos.col};
					break;
				}
			}
			*/

			nextPiecesPosition = this.getPiecesPositionOnMoveEmptyPos(nextEmptyPos);

			return{
				emptyPos: nextEmptyPos,
				piecesPosition: nextPiecesPosition
			}
		});
	}

	getPiecesPositionOnMoveEmptyPos(nextEmptyPos){

		let nextPiecesPosition = {...this.state.piecesPosition};

		for(let k in nextPiecesPosition){
			if((nextPiecesPosition[k].row === nextEmptyPos.row) && (nextPiecesPosition[k].col === nextEmptyPos.col)){
				nextPiecesPosition[k] = {...this.state.piecesPosition[k], row: this.state.emptyPos.row, col: this.state.emptyPos.col};
				break;
			}
		}

		return nextPiecesPosition;
	}

	updatePieces(){
		let pieces = [];

		for(let k in this.state.piecesPosition){
			pieces.push(
				<Piece 
					key={k}
					id={k}
					emptyPos={this.state.emptyPos}
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

	wrongShuffle(){
		/*WRONG METHOD!!*/
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

	shuffle(){
		if(this.state.status === 'ready'){
			const recursiveShuffle = (step, prevEmptyPos)=>{
				if(step > 0){
					//check avaiable moves
					const avaiableMoves = [];

					if(this.state.emptyPos.row < this.props.grid-1){
						if((prevEmptyPos.row-1 !== this.state.emptyPos.row)|| (prevEmptyPos.col !== this.state.emptyPos.col)){
							avaiableMoves.push({row:1, col:0});
						}
					};
					if(this.state.emptyPos.row > 0){
						if((prevEmptyPos.row+1 !== this.state.emptyPos.row) || (prevEmptyPos.col !== this.state.emptyPos.col)){
							avaiableMoves.push({row:-1, col:0});
						}
					};
					if(this.state.emptyPos.col > 0){
						if((prevEmptyPos.row !== this.state.emptyPos.row) || (prevEmptyPos.col+1 !== this.state.emptyPos.col)){
							avaiableMoves.push({row:0, col:-1});
						}
					};
					if(this.state.emptyPos.col < this.props.grid-1){
						if((prevEmptyPos.row !== this.state.emptyPos.row) || (prevEmptyPos.col-1 !== this.state.emptyPos.col)){
							avaiableMoves.push({row:0, col:1});
						}
					};
					//select one random move from avaiable moves
					let randNum = Math.round(Math.random() *  avaiableMoves.length);
					randNum = (randNum === avaiableMoves.length)?randNum-1:randNum;

					const selectedMove = avaiableMoves[randNum];
					
					//apply move
					let nextEmptyPos = {
						row: this.state.emptyPos.row+selectedMove.row,
						col: this.state.emptyPos.col+selectedMove.col
					};
					
					this.setState((prevState)=>{

						prevEmptyPos = prevState.emptyPos;

						return {
							status: 'shuffling',
							emptyPos: nextEmptyPos,
							piecesPosition: this.getPiecesPositionOnMoveEmptyPos(nextEmptyPos)
						}
					});

					window.setTimeout(()=>{
						recursiveShuffle(--step, prevEmptyPos);
					}, 100);
				}else{
					this.setState(()=>{
						return{
							status: 'ready'
						}
					})
				}
			}

			recursiveShuffle(100, this.state.emptyPos);
		}
	}

	render(){
		return (
			<div>
				<div className="game" style={{width: this.props.size, height: this.props.size}}>
					{this.updatePieces()}
				</div>
				{/*
					<p>
						emptyPos - col:{this.state.emptyPos.col}, row:{this.state.emptyPos.row}
					</p>
				*/}
				{/*
				<p>
					<button onClick={this.shuffle.bind(this)}>Shuffle</button>
				</p>
				*/}
			</div>
		);
	}
}

export default Game;