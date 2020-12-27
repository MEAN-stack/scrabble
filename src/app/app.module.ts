import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScrabbleBoardComponent } from './scrabble-board/scrabble-board.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrabbleBoardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
