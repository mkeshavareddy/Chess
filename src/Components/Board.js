import React, { useState } from 'react';
import './Board.css';
import Cell from './Cell';
import UndoButton from './UndoButton';

const Board = () => {
  const [board, setBoard] = useState(
    Array(8)
      .fill(null)
      .map((_, rowIdx) =>
        Array(8)
          .fill(false)
          .map((_, colIdx) => ({
            color: (rowIdx + colIdx) % 2 === 0 ? 'white' : 'black'
          }))
      )
  );
  const [history, setHistory] = useState([]);

  const handleClick = (row, col) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const changes = [];

    for (let i = -7; i <= 7; i++) {
      if (row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8) {
        newBoard[row + i][col + i].color = 'red';
        changes.push([row + i, col + i, board[row + i][col + i].color]);
      }
      if (row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8) {
        newBoard[row + i][col - i].color = 'red';
        changes.push([row + i, col - i, board[row + i][col - i].color]);
      }
    }

    newBoard[row][col].color = 'red';
    changes.push([row, col, board[row][col].color]);

    setHistory([...history, changes]);
    setBoard(newBoard);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastChange = history[history.length - 1];
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));

    lastChange.forEach(([r, c, originalColor]) => {
      newBoard[r][c].color = originalColor;
    });

    setHistory(history.slice(0, -1));
    setBoard(newBoard);
  };

  return (
    <div>
      <UndoButton onClick={handleUndo} disabled={history.length === 0} />
      <div className="board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => (
              <Cell
                key={cIdx}
                color={cell.color}
                onClick={() => handleClick(rIdx, cIdx)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
