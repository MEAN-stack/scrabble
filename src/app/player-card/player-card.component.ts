import { Component, OnInit, Input } from '@angular/core';

interface Player{
  user: string;
  score: number;
  is_current: boolean;
}

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  constructor() { }
  @Input()player: Player;

  ngOnInit(): void {
  }

}
