import React, { useState } from 'react';
import './Board.css';
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
  const [previousCell, setPreviousCell] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleClick = (row, col) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const changes = [];
    let currentState = null;

    // Clear the previous cell and its diagonals
    if (previousCell) {
      currentState = board.map(row => row.map(cell => ({ ...cell })));

      // Clear previous clicked cell and its diagonals
      for (let i = -7; i <= 7; i++) {
        if (previousCell.row + i >= 0 && previousCell.row + i < 8 && previousCell.col + i >= 0 && previousCell.col + i < 8) {
          newBoard[previousCell.row + i][previousCell.col + i].color = (previousCell.row + previousCell.col) % 2 === 0 ? 'white' : 'black';
          changes.push([previousCell.row + i, previousCell.col + i, currentState[previousCell.row + i][previousCell.col + i].color]);
        }
        if (previousCell.row + i >= 0 && previousCell.row + i < 8 && previousCell.col - i >= 0 && previousCell.col - i < 8) {
          newBoard[previousCell.row + i][previousCell.col - i].color = (previousCell.row + previousCell.col) % 2 === 0 ? 'white' : 'black';
          changes.push([previousCell.row + i, previousCell.col - i, currentState[previousCell.row + i][previousCell.col - i].color]);
        }
      }
      newBoard[previousCell.row][previousCell.col].color = (previousCell.row + previousCell.col) % 2 === 0 ? 'white' : 'black';
      changes.push([previousCell.row, previousCell.col, currentState[previousCell.row][previousCell.col].color]);
    }

    // Mark the new clicked cell and its diagonals red
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
    setPreviousCell({ row, col });
    setSelectedCell({ row, col });
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
    setPreviousCell(null);
    setSelectedCell(null);
  };

  return (
    <div>
      <h1 className="heading">Chess Game</h1>
      <UndoButton onClick={handleUndo} disabled={history.length === 0} />
      <div className="board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => (
              <div
                key={cIdx}
                className={`cell ${cell.color}`}
                onClick={() => handleClick(rIdx, cIdx)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {selectedCell && (
        <div className="selected-cell-info">
          <p>
            Selected Cell: Row {selectedCell.row}, Column {selectedCell.col}
          </p>
        </div>
      )}
    </div>
  );
};

export default Board;
