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
  id: number = +localStorage.getItem('id');
  game: ScrabbleGame;
  tiles: Tile[];
  board: string;
  @Input()move: PlayMove = {row: 0, col: 0, direction: 'A', tiles: '', move_type: 'play'};

  refresh(){
    const source = timer(1000,1000);
    const abc = source.subscribe(val => {
//      console.log(val);
      this.gameService.getGameInfo(this.id).subscribe(
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

  playMove(){
    this.gameService.playMove(this.id, this.move).subscribe(
      (response) => {
        console.log('yay');
        console.log(response);
      },
      (err) => {
        console.log('no');
        console.log(err);
      });
  }

  ngOnInit(): void {
    this.refresh();
  }
}
