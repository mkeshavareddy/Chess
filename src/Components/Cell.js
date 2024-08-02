import React from 'react';
import './Cell.css';

const Cell = ({ color, onClick }) => {
  return <div className={`cell ${color}`} onClick={onClick}></div>;
};

export default Cell;
