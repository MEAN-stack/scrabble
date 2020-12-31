import { Component, OnInit, Input } from '@angular/core';
import { RackComponent } from '../rack/rack.component';
import { ScrabbleBoardComponent } from '../scrabble-board/scrabble-board.component';
import { GameService, PlayMove } from '../game/game.service';
import { Tile } from '../tile';
import { timer } from 'rxjs';

export interface Player {
  user: string,
  tiles: Tile[],
  is_current: boolean,
  score: number
}

export interface ScrabbleGame {
  id: number,
  owner: string,
  players: Player[],
  current_player: string,
  status: string,
  num_free_tiles: number,
  board: string,
}

@Component({
  selector: 'app-scrabble-game',
  templateUrl: './scrabble-game.component.html',
  styleUrls: ['./scrabble-game.component.css']
})

export class ScrabbleGameComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) { }

  user: string = localStorage.getItem('user');
  game: ScrabbleGame;
  tiles: Tile[];
  board: string;

  refresh(){
    const source = timer(0,1000);
    const abc = source.subscribe(val => {
//      console.log(val);
      this.gameService.getGameInfo().subscribe(
        (response) => {
          this.game = response
          this.board = this.game.board;
//          console.dir(this.game);
          for(let i = 0; i < this.game.players.length; i++){
            let player = this.game.players[i]
            player.is_current = false;
            if(player.user===this.game.current_player){
              player.is_current = true;
            }
            if(this.user===player.user){
              this.tiles = player.tiles;
            }
            //          this.rack.tiles = this.game.
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };

  ngOnInit(): void {
    this.refresh();
  }
}
