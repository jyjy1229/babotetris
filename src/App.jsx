import React, { useEffect } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls";
import SideBar from "./components/SideBar";
import { useGameState } from "./hooks/useGameState";

function App() {
  const {
    board,
    currentTetromino,
    nextTetromino,
    position,
    score,
    lines,
    level,
    gameStatus,
    moveTetromino,
    rotate,
    startGame,
    togglePause,
  } = useGameState();

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus !== "playing") {
        if (e.key === "p" || e.key === "P") {
          togglePause();
        }
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveTetromino(-1, 0, false);
          break;
        case "ArrowRight":
          e.preventDefault();
          moveTetromino(1, 0, false);
          break;
        case "ArrowDown":
          e.preventDefault();
          moveTetromino(0, 1, true);
          break;
        case "ArrowUp":
          e.preventDefault();
          rotate();
          break;
        case "p":
        case "P":
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStatus, moveTetromino, rotate, togglePause]);

  const handleLeft = () => moveTetromino(-1, 0, false);
  const handleRight = () => moveTetromino(1, 0, false);
  const handleDown = () => moveTetromino(0, 1, true);

  const isControlsDisabled = gameStatus !== "playing";

  return (
    <div className="app">
      <div className="game-layout">
        <SideBar
          score={score}
          lines={lines}
          level={level}
          gameStatus={gameStatus}
          nextTetromino={nextTetromino}
          onStart={startGame}
          onPause={togglePause}
        />

        <div className="game-area">
          <Board
            board={board}
            currentTetromino={currentTetromino}
            position={position}
            gameStatus={gameStatus}
          />

          <Controls
            onLeft={handleLeft}
            onRight={handleRight}
            onRotate={rotate}
            onDown={handleDown}
            disabled={isControlsDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
