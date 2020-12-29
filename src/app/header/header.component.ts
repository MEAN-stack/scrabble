import { Component, OnInit } from '@angular/core';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Scrabble';
  logo = '/assets/img/logo.png';

  constructor(private gameService: GameService) { }

  createGame() {
    this.gameService.createGame().subscribe(
      (response) => {
        console.log("game id: " + response.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void { }
}

