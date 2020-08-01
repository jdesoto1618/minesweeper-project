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
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for(i = 0; i < numberOfSquares; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

});