import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScrabbleBoardComponent } from './scrabble-board/scrabble-board.component';
import { ScrabbleGameComponent } from './scrabble-game/scrabble-game.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game-page', component: ScrabbleGameComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
