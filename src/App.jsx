import { GameBoard, GameOver, Log, Player } from './components';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';

const deriveActivePlayer = (turns) => {
  let currentPlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveWinner = (gameBoard, players) => {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
};
const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const onActivePlayerChanged = (rowIndex, colIndex) => {
    console.log('clicked');
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  console.log('Activ Player, ', gameTurns);
  const onRestart = () => {
    setGameTurns([]);
  };

  const onPlayerNameChanged = ({ symbol, newName }) => {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  };
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            name={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onPlayerChanged={onPlayerNameChanged}
          />
          <Player
            name={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onPlayerChanged={onPlayerNameChanged}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={onRestart} />
        )}
        <GameBoard setPlayerSymbol={onActivePlayerChanged} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
