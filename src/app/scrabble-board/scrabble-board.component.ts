import { Component, OnInit, Input } from '@angular/core';
import { scrabbleSquares } from '../scrabble-squares';
import { Tile, tileValues } from '../tile';

@Component({
  selector: 'app-scrabble-board',
  templateUrl: './scrabble-board.component.html',
  styleUrls: ['./scrabble-board.component.css']
})

export class ScrabbleBoardComponent implements OnInit {
  squares = scrabbleSquares;
  test: string;
  constructor() { }
  @Input()board = ' '.repeat(225);//' '.repeat(112) + 'HELLO' + ' '.repeat(108);
  currentTile: Tile = {letter: 'A', value: 1, isBlank: false};
  testfunc(row,col){
    let i=col+row*15;
    let letter=this.board[i];
    if(letter!=' '){
      this.currentTile = {
        letter: letter,
        value: tileValues[letter.charCodeAt(0) - 65],
        isBlank: false}
      return true;
    }
    return false;
  }

  logfunc(){
    console.log(this.test);
  }

  ngOnInit(): void {
  }

}
