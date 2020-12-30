export interface ScrabbleSquare {
  row: number;
  col: number;
  bonus: string;
}

var squares: ScrabbleSquare[] = [];

function bonus(row: number, col: number){
  if((row==7) && (col==7)) return 'DW';
  var x = (col<7) ? col : 14-col
  var y = (row<7) ? row : 14-row
  if((x==0) && (y==0) || (x==7) && (y==0) || (y==7) && (x==0)) return 'TW';
  if(x==y){
    if(x==5) return 'TL';
    if(x==6) return 'DL';
    return 'DW';
  }
  if((x==3)&&(y==0) || (y==3)&&(x==0)) return 'DL';
  if((x==1)&&(y==5) || (x==5)&&(y==1)) return 'TL';
  if((x==2)&&(y==6) || (x==6)&&(y==2)) return 'DL';
  if((x==3)&&(y==7) || (x==7)&&(y==3)) return 'DL';
  return 'none'
}

for(var row=0;row<15;row++){
  for(var col=0;col<15;col++){
    var square: ScrabbleSquare = {
      row: row,
      col: col,
      bonus: bonus(row,col)
    };
    squares.push(square);
  }
}

export const scrabbleSquares = squares;
