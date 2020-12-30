import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrabbleGameComponent } from './scrabble-game.component';

describe('ScrabbleGameComponent', () => {
  let component: ScrabbleGameComponent;
  let fixture: ComponentFixture<ScrabbleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrabbleGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrabbleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
