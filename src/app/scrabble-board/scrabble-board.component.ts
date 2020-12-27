import { Component, OnInit } from '@angular/core';
import { scrabbleSquares } from '../scrabble-squares'

@Component({
  selector: 'app-scrabble-board',
  templateUrl: './scrabble-board.component.html',
  styleUrls: ['./scrabble-board.component.css']
})

export class ScrabbleBoardComponent implements OnInit {
  squares = scrabbleSquares;
  constructor() { }

  ngOnInit(): void {
  }

}
