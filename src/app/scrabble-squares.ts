export interface ScrabbleSquare {
  row: number;
  col: number;
  bonus: string;
}

const squares: ScrabbleSquare[] = [];

function bonus(row: number, col: number): string{
  if ((row === 7) && (col === 7)){
    return 'DW';
  }
  const x = (col < 7) ? col : 14 - col;
  const y = (row < 7) ? row : 14 - row;
  if ((x === 0 && y === 0) || (x === 7 && y === 0) || (y === 7 && x === 0)){
    return 'TW';
  }
  if (x === y){
    if (x === 5){
      return 'TL';
    }
    if (x === 6){
      return 'DL';
    }
    return 'DW';
  }
  if ((x === 3 && y === 0) || (y === 3 && x === 0)){
    return 'DL';
  }
  if ((x === 1 && y === 5) || (x === 5 && y === 1)){
    return 'TL';
  }
  if ((x === 2 && y === 6) || (x === 6 && y === 2)){
    return 'DL';
  }
  if ((x === 3 && y === 7) || (x === 7 && y === 3)){
    return 'DL';
  }
  return 'none';
}

for (let row = 0; row < 15; row++){
  for (let col = 0; col < 15; col++){
    const square: ScrabbleSquare = {
      row,
      col,
      bonus: bonus(row, col)
    };
    squares.push(square);
  }
}

export const scrabbleSquares = squares;
