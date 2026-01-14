import React, { useEffect } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import TopBar from './components/TopBar';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    board,
    currentTetromino,
    position,
    score,
    lines,
    level,
    gameStatus,
    moveTetromino,
    rotate,
    hardDrop,
    startGame,
    togglePause
  } = useGameState();

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus !== 'playing') {
        if (e.key === 'p' || e.key === 'P') {
          togglePause();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveTetromino(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveTetromino(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveTetromino(0, 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotate();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus, moveTetromino, rotate, hardDrop, togglePause]);

  const handleLeft = () => moveTetromino(-1, 0);
  const handleRight = () => moveTetromino(1, 0);
  const handleDown = () => moveTetromino(0, 1);

  const isControlsDisabled = gameStatus !== 'playing';

  return (
    <div className="app">
      <TopBar
        score={score}
        lines={lines}
        level={level}
        gameStatus={gameStatus}
        onStart={startGame}
        onPause={togglePause}
      />
      
      <div className="main-content">
        <Board 
          board={board} 
          currentTetromino={currentTetromino}
          position={position}
          gameStatus={gameStatus}
        />
      </div>
      
      <Controls
        onLeft={handleLeft}
        onRight={handleRight}
        onRotate={rotate}
        onDown={handleDown}
        disabled={isControlsDisabled}
      />
    </div>
  );
}

export default App;
