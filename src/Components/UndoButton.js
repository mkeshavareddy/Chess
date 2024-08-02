import React from 'react';
import './UndoButton.css';

const UndoButton = ({ onClick, disabled }) => {
  return (
    <button className="btn" onClick={onClick} disabled={disabled}>
      UNDO
    </button>
  );
};

export default UndoButton;
