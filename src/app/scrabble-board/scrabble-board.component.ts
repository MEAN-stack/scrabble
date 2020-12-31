import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { scrabbleSquares } from '../scrabble-squares';
import { GameService, PlayMove } from '../game/game.service';
import { Tile, tileValues } from '../tile';

interface Square{
  row: number;
  col: number;
}

@Component({
  selector: 'app-scrabble-board',
  templateUrl: './scrabble-board.component.html',
  styleUrls: ['./scrabble-board.component.css']
})

export class ScrabbleBoardComponent implements OnInit, OnChanges {
  squares = scrabbleSquares;

  constructor(
    private gameService: GameService
  ) { }

  @Input()board = ' '.repeat(225);//' '.repeat(112) + 'HELLO' + ' '.repeat(108);
  currentTile: Tile = {letter: 'A', value: 1, isBlank: false};

  setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  testfunc(row,col){
    let i=col+row*15;
    let letter=this.board[i];
    let userLetter=this.userBoard[i];
    if(letter!=' '){
      this.currentTile = {
        letter: letter,
        value: tileValues[letter.charCodeAt(0) - 65],
        isBlank: false}
      return true;
    }
    if(userLetter!=' '){
      this.currentTile = {
        letter: userLetter,
        value: tileValues[userLetter.charCodeAt(0) - 65],
        isBlank: false}
      return true;
    }
    return false;
  }

  onClick(row: number, col: number){
    this.playTiles = '';
    this.displayedTiles = this.tiles.slice();
    this.userBoard = this.board;
    if(this.isFocused(row,col)){
      this.userDirection = (this.userDirection==='right') ? 'down':'right';
    }
    this.userSquare = {row: row, col: col};
    this.playSquare = {row: row, col: col};
  }

  onKeyDown(evt){
    if(evt.key=='Backspace'){
      this.advanceSquare(-1);
      let letter = this.userBoard[this.userSquare.row*15+this.userSquare.col];
      if (letter === ' '){
        this.playSquare.row = this.userSquare.row;
        this.playSquare.col = this.userSquare.col;
        return;
      }
      this.userBoard = this.setCharAt(this.userBoard,this.userSquare.row*15+this.userSquare.col,' ');
      this.playTiles = this.playTiles.slice(0,-1);
      for(let i = 0; i<this.tiles.length;i++){
        let tile = this.tiles[i]
        if(letter===tile.letter){
          this.displayedTiles.push(tile);
          return;
        }
      }
      for(let i = 0; i<this.tiles.length;i++){
        let tile = this.tiles[i]
        if(tile.isBlank){
          this.displayedTiles.push(tile);
          return;
        }
      }
    }
    if(evt.key=='Enter'){
      this.playMove();
      this.userBoard = ' '.repeat(225);
      this.playSquare = {row: 100, col: 100};
      this.userSquare = {row: 100, col: 100};
    }

  }

  onKeyPress(evt){
    let letter=evt.key.toUpperCase();
    for(let i = 0;i<this.displayedTiles.length;i++){
      let tile = this.displayedTiles[i];
      if(letter===tile.letter){
        this.displayedTiles.splice(i,1);
        this.userBoard=this.setCharAt(this.userBoard,this.userSquare.row*15+this.userSquare.col,letter);
        this.playTiles+=letter;
        this.advanceSquare(1);
        return true;
      }
    }
    for(let i = 0;i<this.displayedTiles.length;i++){
      let tile = this.displayedTiles[i];
      if(tile.isBlank){
        this.displayedTiles.splice(i,1);
        this.userBoard=this.setCharAt(this.userBoard,this.userSquare.row*15+this.userSquare.col,letter.toLowerCase());
        this.playTiles+=letter.toLowerCase();
        this.advanceSquare(1);
        return true;
      }
    }
    return false;
  }

  advanceSquare(dir: number){
    if(this.userDirection==='right'){
      this.userSquare.col+=dir;
      while(this.userSquare.col>=0 && this.userSquare.col<15 && this.board[this.userSquare.row*15+this.userSquare.col]!=' '){
        this.userSquare.col+=dir;
      }
    }else{
      this.userSquare.row+=dir;
      while(this.userSquare.row>=0 && this.userSquare.row<15 && this.board[this.userSquare.row*15+this.userSquare.col]!=' '){
        this.userSquare.row+=dir;
      }
    }
  }

  isFocused(row: number, col: number){
    return (this.userSquare.row ===row && this.userSquare.col===col);
  }

  playMove(){
    let move = {
      row: this.playSquare.row,
      col: this.playSquare.col,
      direction: (this.userDirection==='right')? 'A':'D',
      tiles: this.playTiles,
      move_type: 'play'
    };
    console.log(move);
    this.gameService.playMove(move).subscribe(
      (response) => {
        console.log(response);
        if(response.status=='ok'){
          this.tiles = response.tiles;
          this.displayedTiles = this.tiles.slice();
        }
      },
      (err) => {
        console.log(err);
      });
  }

  testfunction(evt){
    console.log(evt);
  }

  userBoard: string = this.board;
  userDirection: string = 'right';
  userSquare: Square = {row: 100, col: 100};
  playTiles: string = '';
  playSquare: Square = {row: 40, col: 50};
  @Input()tiles: Tile[]
  displayedTiles: Tile[]
  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.displayedTiles = this.tiles.slice();
  }
}
