import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

interface CreateGameResponse {
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private http: HttpClient, private router: Router) { }

    createGame(): Observable<CreateGameResponse> {
        return this.http.post<CreateGameResponse>("/api/games", {});
    };
}
