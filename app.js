document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let width = 10;
  let numberOfBombs = 20;
  let flags = 0;
  let squares = [];
  let isGameOver = false;
  let numberOfValidSquaresChecked = document.querySelectorAll('.checked');

  function createBoard() {
    let i;
    let j;
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

      square.addEventListener('click', () => {
        click(square);
        checkForWin();
      });

      square.oncontextmenu = (e) => {
        e.preventDefault();
        addFlag(square);
      };
    }

    for(j = 0; j < squares.length; j++) {
      let total = 0;
      const isLeftEdge = (j % width === 0);
      const isRightEdge = (j % width === width - 1);
      
      if (squares[j].classList.contains('valid')) {
        if (j > 0 && !isLeftEdge && squares[j - 1].classList.contains('bomb')) total ++;
        if (j > 9 && !isRightEdge && squares[j + 1 - width].classList.contains('bomb')) total ++;
        if (j > 10 && squares[j - width].classList.contains('bomb')) total++;
        if (j > 11 && !isLeftEdge && squares[j - 1 - width].classList.contains('bomb')) total ++;
        if (j < 98 && !isRightEdge && squares[j + 1].classList.contains('bomb')) total ++;
        if (j < 90 && !isLeftEdge && squares[j - 1 + width].classList.contains('bomb')) total ++;
        if (j < 88 && !isRightEdge && squares[j + 1 + width].classList.contains('bomb')) total ++;
        if (j < 89 && squares[j + width].classList.contains('bomb')) total ++;
        squares[j].setAttribute('data', total);
      }
    }
  }
  createBoard();

  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < numberOfBombs)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag');
        square.innerHTML = '🚩';
        flags++;
        checkForWin();
      } else {
        square.classList.remove('flag');
        square.innerHTML = '';
        flags--;
      }
    }
  }

  function click(square) {
    let currentId = square.id;
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flagged')) return
    if (square.classList.contains('bomb')) {
      gameOver(square);
      return
    } else {
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return
      }
      checkSquare(square, currentId);
    }
    square.classList.add('checked');
  }

  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = parseInt(currentId, 10) - 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 9 && !isRightEdge) {
        const newId = parseInt(currentId, 10) + 1 - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 10) {
        const newId = parseInt(currentId, 10) - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > 11 && !isLeftEdge) {
        const newId = parseInt(currentId, 10) - 1 - width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 98 && !isRightEdge) {
        const newId = parseInt(currentId, 10) + 1;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 90 && !isLeftEdge) {
        const newId = parseInt(currentId, 10) - 1 + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 88 && !isRightEdge) {
        const newId = parseInt(currentId, 10) + 1 + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < 89) {
        const newId = parseInt(currentId, 10) + width;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10)
  }

  function gameOver(square) {
    console.log('BOOOOOM');
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣';
      }
    })
    isGameOver = true;
  }

  function checkForWin() {
    if (isGameOver) return
    let i;
    let matches = 0;
    const squaresWithoutBombs = (width * width) - numberOfBombs;
    for (i = 0; i < squares.length; i++) {
      if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        matches++;
      }
    }
    if(matches === numberOfBombs) {
      alert('You won!!!');
      isGameOver = true;
    }
    if (getNumberOfCheckedSquares() === squaresWithoutBombs) {
      alert('You found all valid squares!');
      isGameOver = true;
    }
  }

  function getNumberOfCheckedSquares() {
    numberOfValidSquaresChecked = document.querySelectorAll('.checked');
    return numberOfValidSquaresChecked.length;
  }
});
