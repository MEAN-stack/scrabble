import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../game/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  joinGameForm = new FormGroup({
    id: new FormControl(0, Validators.required),
  });

  onSubmit(): void {
    this.joinGameForm.disable();
    this.joinGame(this.joinGameForm.value.id);
  }

  createGame(): void {
    this.gameService.createGame().subscribe(
      (response) => {
        console.log('game id: ' + response.id);
        this.joinGame(response.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  joinGame(id): void {
    this.gameService.joinGame(id).subscribe(
      (response) => {
        console.log('success ' + response.text);
        localStorage.setItem('id', id);
        this.router.navigate(['../game-page']);
      },
      (err) => {
        console.log('fail');
        console.log(err);
        this.joinGameForm.enable();
      }
    );
  }

  ngOnInit(): void {
  }

}
