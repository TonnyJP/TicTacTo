import { useState } from 'react';

export const GameBoard = ({ setPlayerSymbol, board }) => {
  return (
    <ol id='game-board'>
      {board.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIdx) => {
              return (
                <li key={colIdx}>
                  <button
                    onClick={() => setPlayerSymbol(rowIdx, colIdx)}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
};
