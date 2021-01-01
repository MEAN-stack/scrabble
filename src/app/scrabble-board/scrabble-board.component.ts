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

  @Input()board = ' '.repeat(225);
  @Input()tiles: Tile[];
  userBoard: string = this.board;
  userDirection = 'right';
  userSquare: Square = {row: 100, col: 100};
  playTiles = '';
  playSquare: Square = {row: 40, col: 50};
  displayedTiles: Tile[];
  currentTile: Tile = {letter: 'A', value: 1, isBlank: false};

  setCharAt(str, index, chr): string {
    if (index > str.length - 1) {
      return str;
    }
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  testfunc(row, col): boolean{
    const index = col + row * 15;
    const letter = this.board[index];
    const userLetter = this.userBoard[index];
    if (letter !== ' '){
      this.currentTile = {
        letter,
        value: tileValues[letter.charCodeAt(0) - 65],
        isBlank: false};
      return true;
    }
    if (userLetter !== ' '){
      this.currentTile = {
        letter: userLetter,
        value: tileValues[userLetter.charCodeAt(0) - 65],
        isBlank: false};
      return true;
    }
    return false;
  }

  onClick(row: number, col: number): void{
    this.resetVars();
    if (this.isFocused(row, col)){
      this.userDirection = (this.userDirection === 'right') ? 'down' : 'right';
    }
    this.userSquare = {row, col};
    this.playSquare = {row, col};
  }

  tileClick(tile): void{
    console.dir(tile);
    let letter;
    if (tile.isBlank){
      letter = prompt('what letter for the blank?');
    } else {
      letter = tile.letter;
    }
    this.onKeyPress({key: letter});
  }

  onKeyDown(evt): void{
    if (evt.key === 'Backspace'){
      this.advanceSquare(-1);
      const index = this.userSquare.row * 15 + this.userSquare.col;
      const letter = this.userBoard[index];
      if (letter === ' '){
        this.playSquare.row = this.userSquare.row;
        this.playSquare.col = this.userSquare.col;
        return;
      }
      this.userBoard = this.setCharAt(this.userBoard, index, ' ');
      this.playTiles = this.playTiles.slice(0, -1);
      for (const tile of this.tiles){
        if (letter === tile.letter){
          this.displayedTiles.push(tile);
          return;
        }
      }
      for (const tile of this.tiles){
        if (tile.isBlank){
          this.displayedTiles.push(tile);
          return;
        }
      }
    }
    if (evt.key === 'Enter'){
      this.playMove();
      this.userBoard = ' '.repeat(225);
      this.playSquare = {row: 100, col: 100};
      this.userSquare = {row: 100, col: 100};
    }
  }

  onKeyPress(evt): void{
    const letter = evt.key.toUpperCase();
    const index = this.userSquare.row * 15 + this.userSquare.col;
    for (let i = 0; i < this.displayedTiles.length; i++){
      const tile = this.displayedTiles[i];
      if (letter === tile.letter){
        this.displayedTiles.splice(i, 1);
        this.userBoard = this.setCharAt(this.userBoard, index, letter);
        this.playTiles += letter;
        this.advanceSquare(1);
        return;
      }
    }
    for (let i = 0; i < this.displayedTiles.length; i++){
      const tile = this.displayedTiles[i];
      if (tile.isBlank){
        this.displayedTiles.splice(i, 1);
        this.userBoard = this.setCharAt(this.userBoard, index, letter.toLowerCase());
        this.playTiles += letter.toLowerCase();
        this.advanceSquare(1);
        return;
      }
    }
  }

  advanceSquare(dir: number): void{
    let index = this.userSquare.row * 15 + this.userSquare.col;
    if (this.userDirection === 'right'){
      this.userSquare.col += dir;
      index += 1;
      while (this.userSquare.col >= 0 && this.userSquare.col < 14 && this.board[index] !== ' '){
        this.userSquare.col += dir;
        index += 1;
      }
    }else{
      this.userSquare.row += dir;
      while (this.userSquare.row >= 0 && this.userSquare.row < 14 && this.board[index] !== ' '){
        this.userSquare.row += dir;
        index += 15;
      }
    }
  }

  isFocused(row: number, col: number): boolean{
    return (this.userSquare.row === row && this.userSquare.col === col);
  }

  change(): void{
    this.gameService.playMove({move_type: 'change', tiles: this.playTiles}).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'ok'){
          this.tiles = response.tiles;
        }
        this.resetVars();
      },
      (err) => {
        console.log(err);
      });
  }

  pass(): void{
    this.gameService.playMove({move_type: 'pass'}).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'ok'){
          this.tiles = response.tiles;
          this.resetVars();
        }
        this.resetVars();
      },
      (err) => {
        console.log(err);
      });
  }

  resetVars(): void{
    this.userBoard = ' '.repeat(255);
    this.displayedTiles = this.tiles.slice();
    this.playTiles = '';
  }

  playMove(): void{
    const move = {
      row: this.playSquare.row,
      col: this.playSquare.col,
      direction: (this.userDirection === 'right') ? 'A' : 'D',
      tiles: this.playTiles,
      move_type: 'play'
    };
    console.log(move);
    this.gameService.playMove(move).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'ok'){
          this.tiles = response.tiles;
        }
        this.resetVars();

      },
      (err) => {
        console.log(err);
      });
  }


  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.resetVars();
  }
}
