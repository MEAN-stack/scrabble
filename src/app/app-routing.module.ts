import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScrabbleBoardComponent } from './scrabble-board/scrabble-board.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'game-page', component: ScrabbleBoardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

