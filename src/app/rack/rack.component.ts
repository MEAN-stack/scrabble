import { Component, OnInit, Input, Output } from '@angular/core'
import { Tile } from '../tile'

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.css']
})
export class RackComponent implements OnInit {
  @Input()tiles: Tile[] = [{letter: "F", value: 4, isBlank: false},
                   {letter: "R", value: 1, isBlank: false},
                   {letter: "G", value: 2, isBlank: false},
                   {letter: "I", value: 1, isBlank: false},
                   {letter: "Z", value: 10, isBlank: false},
                   {letter: "F", value: 4, isBlank: false},
                   {letter: "A", value: 1, isBlank: false}];
  constructor() { }

  ngOnInit(): void {
  }

}
