document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let numberOfBombs = 20;
  let squares = [];

  function createBoard() {
    let i;
    let numberOfSquares = width * width;
    const bombsArray = Array(numberOfBombs).fill('bomb');
    const emptyArray = Array(width*width - numberOfBombs).fill('valid');

    console.log(bombsArray, emptyArray);
    for(i = 0; i < numberOfSquares; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

});