import {useState} from 'react';
import {range} from './util';

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>
}

function Board() {
  const [squareValues, setSquareValues] = useState(Array(9).fill(null));
  
  function handleClick(index) {
    const nextSquares = squareValues.slice();
    nextSquares[index] = 'X';
    setSquareValues(nextSquares);
  }
  
  return <>
    {range(0, 3).map((i) => {
      return <div className="board-row">
        {range(0, 3).map((j) => {
          const index = i * 3 + j;
          return <Square key={index} value={squareValues[index]} onSquareClick={() => handleClick(index)}/>
        })}
      </div>
    })}
  </>
}

function App() {
  
  
  return (
    <Board/>
  );
}

export default App;
