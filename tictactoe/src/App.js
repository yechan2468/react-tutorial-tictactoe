import {useState} from 'react';
import {range} from './util';


function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({xIsNext, squareValues, onPlay}) {
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  function handleClick(index) {
    if (squareValues[index] || calculateWinner(squareValues)) return;
    const nextSquares = squareValues.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }
  
  const winner = calculateWinner(squareValues)
  const status = winner ?
    `Winner: ${winner}` :
    `Next Player: ${xIsNext ? 'X' : 'O'}`
  
  return <>
    <div className="status">{status}</div>
    {range(0, 3).map((i) => {
      return <div key={i} className="board-row">
        {range(0, 3).map((j) => {
          const index = i * 3 + j;
          return <Square key={index} value={squareValues[index]} onSquareClick={() => handleClick(index)}/>
        })}
      </div>
    })}
  </>
}

function GameInfo({history, jumpTo}) {
  const moves = history.map((squares, move) => {
    const description = move === 0 ?
      `Go to game start` :
      `You are at move #${move}`;
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });
  
  return (
    <ol>{moves}</ol>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  
  function jumpTo(nextMove) {
    const nextHistory = [...history.slice(0, currentMove + 1)]
    setHistory(nextHistory);
    setCurrentMove(nextMove);
  }
  
  
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squareValues={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <GameInfo history={history} jumpTo={jumpTo}/>
      </div>
    </div>
  )
}

function App() {
  return (
    <Game/>
  );
}

export default App;
