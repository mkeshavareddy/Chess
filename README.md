# React Board Game

This React project implements a simple board game where cells on an 8x8 grid can be marked red with a click. An Undo button is provided to revert the last change. The project demonstrates basic state management, component separation, and CSS styling in React.

## Features

- **8x8 Board**: The game board consists of an 8x8 grid of cells.
- **Mark Cells**: Clicking on a cell marks it and all cells diagonally aligned with it in red.
- **Undo Button**: Allows reverting the last marking action.
- **Full Page Background**: The background color covers the entire viewport.

## Project Structure

- **`src/`**: Contains all source files.
  - **`App.js`**: The root component that renders the `Board` component.
  - **`Board.js`**: Handles the game logic and rendering of the board.
  - **`UndoButton.js`**: A reusable button component for undoing actions.
  - **`App.css`**: Contains styling for the entire application.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine. [Download Node.js](https://nodejs.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mkeshavareddy/Chess

2.Live on Netlify

