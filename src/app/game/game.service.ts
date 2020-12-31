import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

interface CreateGameResponse {
  id: number;
}

interface JoinGameResponse {
  text: string;
}

export interface PlayMove {
  move_type: string,
  row: number,
  col: number,
  direction: string,
  tiles: string
}

@Injectable({
  providedIn: 'root'
})

export class GameService {
  constructor(private http: HttpClient, private router: Router) { }

  id: number = +localStorage.getItem('id');


  createGame(): Observable<CreateGameResponse> {
    return this.http.post<CreateGameResponse>("/api/games", {});
  };

  joinGame(id: number = this.id): Observable<JoinGameResponse> {
    return this.http.post<JoinGameResponse>("/api/games/"+id+"/players", {});
  };
  getGameInfo(id: number = this.id): Observable<any> {
    return this.http.get<any>("/api/games/"+this.id, {});
  };
  playMove(move: PlayMove, id: number = this.id): Observable<any> {
    return this.http.put<any>("/api/games/"+this.id, move);
  };
}
