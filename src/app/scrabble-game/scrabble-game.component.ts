import { Component, OnInit, Input } from '@angular/core';
import { ScrabbleBoardComponent } from '../scrabble-board/scrabble-board.component';
import { GameService, PlayMove } from '../game/game.service';
import { WebsocketService } from '../websocket.service';
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
  styleUrls: ['./scrabble-game.component.css'],
  providers: [WebsocketService]
})

export class ScrabbleGameComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private ws: WebsocketService,
  ) { }

  id: number = +localStorage.getItem('id');
  user: string = localStorage.getItem('user');
  game: ScrabbleGame = {id: undefined, owner: undefined, players: [], current_player: undefined, status: undefined, num_free_tiles: undefined, board: ' '.repeat(225)};
  tiles: Tile[] = [];

  getUrl(){
    if(window.location.protocol=='http:'){
      return 'ws://'+window.location.host;
    } else {
      return 'wss://'+window.location.host;
    }
  }

  test = this.ws.connect(this.getUrl()).map(
    (response) => {
      let data = JSON.parse(response.data);
      return data;
    }).subscribe(
      (msg) => {
        console.log('websocket', msg);
        if(msg.title=='newplayer'){
          if(this.id === msg.data.gameId){
            this.game.players.push({ user: msg.data.player, score: 0, tiles: undefined, is_current: false});
          }
        }
        if(msg.title=='game'){
          this.game=msg.data;
          for(let i = 0; i < this.game.players.length; i++){
            let player = this.game.players[i]
            player.is_current = false;
            if(player.user===this.game.current_player){
              player.is_current = true;
            }
          }
        }
      });

  ngOnInit(): void {

    this.gameService.getGameInfo().subscribe(
      (response) => {
        this.game = response
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
      });
  }
}
