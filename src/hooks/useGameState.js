import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomTetromino, rotateTetromino } from '../utils/tetrominos';
import {
  createEmptyBoard,
  checkCollision,
  mergeTetromino,
  clearLines,
  calculateScore,
  isGameOver,
  BOARD_WIDTH
} from '../utils/gameLogic';

const INITIAL_DROP_SPEED = 1000; // 1초
const SPEED_INCREASE_PER_LEVEL = 100; // 레벨당 속도 증가

export const useGameState = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentTetromino, setCurrentTetromino] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, paused, over
  const [dropSpeed, setDropSpeed] = useState(INITIAL_DROP_SPEED);

  const dropIntervalRef = useRef(null);

  // 새 테트로미노 생성
  const spawnTetromino = useCallback(() => {
    const newTetromino = getRandomTetromino();
    const startX = Math.floor(BOARD_WIDTH / 2) - Math.floor(newTetromino.shape[0].length / 2);
    const startY = 0;

    // 게임 오버 체크
    if (checkCollision(board, newTetromino, { x: startX, y: startY })) {
      setGameStatus('over');
      return;
    }

    setCurrentTetromino(newTetromino);
    setPosition({ x: startX, y: startY });
  }, [board]);

  // 테트로미노 이동
  const moveTetromino = useCallback((dx, dy) => {
    if (!currentTetromino || gameStatus !== 'playing') return false;

    const newPosition = { x: position.x + dx, y: position.y + dy };

    if (!checkCollision(board, currentTetromino, newPosition)) {
      setPosition(newPosition);
      return true;
    }

    // 아래로 이동 시 충돌하면 블록 고정
    if (dy > 0) {
      const newBoard = mergeTetromino(board, currentTetromino, position);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

      setBoard(clearedBoard);
      
      if (linesCleared > 0) {
        const points = calculateScore(linesCleared);
        setScore(prev => prev + points);
        setLines(prev => {
          const newLines = prev + linesCleared;
          const newLevel = Math.floor(newLines / 10) + 1;
          if (newLevel !== level) {
            setLevel(newLevel);
            setDropSpeed(INITIAL_DROP_SPEED - (newLevel - 1) * SPEED_INCREASE_PER_LEVEL);
          }
          return newLines;
        });
      }

      // 게임 오버 체크
      if (isGameOver(clearedBoard)) {
        setGameStatus('over');
        return false;
      }

      spawnTetromino();
      return false;
    }

    return false;
  }, [currentTetromino, position, board, gameStatus, level, spawnTetromino]);

  // 테트로미노 회전
  const rotate = useCallback(() => {
    if (!currentTetromino || gameStatus !== 'playing') return;

    const rotated = rotateTetromino(currentTetromino);

    // 회전 후 벽 킥 시도
    const kicks = [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: -2, y: 0 },
      { x: 2, y: 0 }
    ];

    for (const kick of kicks) {
      const newPosition = { x: position.x + kick.x, y: position.y + kick.y };
      if (!checkCollision(board, rotated, newPosition)) {
        setCurrentTetromino(rotated);
        setPosition(newPosition);
        return;
      }
    }
  }, [currentTetromino, position, board, gameStatus]);

  // 하드 드롭 (즉시 낙하)
  const hardDrop = useCallback(() => {
    if (!currentTetromino || gameStatus !== 'playing') return;

    let newY = position.y;
    while (!checkCollision(board, currentTetromino, { x: position.x, y: newY + 1 })) {
      newY++;
    }

    setPosition({ x: position.x, y: newY });
    // 다음 프레임에서 블록 고정
    setTimeout(() => moveTetromino(0, 1), 0);
  }, [currentTetromino, position, board, gameStatus, moveTetromino]);

  // 게임 시작
  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLines(0);
    setLevel(1);
    setDropSpeed(INITIAL_DROP_SPEED);
    setGameStatus('playing');
    
    const newTetromino = getRandomTetromino();
    const startX = Math.floor(BOARD_WIDTH / 2) - Math.floor(newTetromino.shape[0].length / 2);
    setCurrentTetromino(newTetromino);
    setPosition({ x: startX, y: 0 });
  }, []);

  // 게임 일시정지/재개
  const togglePause = useCallback(() => {
    if (gameStatus === 'playing') {
      setGameStatus('paused');
    } else if (gameStatus === 'paused') {
      setGameStatus('playing');
    }
  }, [gameStatus]);

  // 자동 낙하
  useEffect(() => {
    if (gameStatus === 'playing' && currentTetromino) {
      dropIntervalRef.current = setInterval(() => {
        moveTetromino(0, 1);
      }, dropSpeed);

      return () => {
        if (dropIntervalRef.current) {
          clearInterval(dropIntervalRef.current);
        }
      };
    }
  }, [gameStatus, currentTetromino, moveTetromino, dropSpeed]);

  // 렌더링을 위한 보드 생성 (고정된 블록만 포함)
  const displayBoard = useCallback(() => {
    return board.map(row => [...row]);
  }, [board]);

  return {
    board: displayBoard(),
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
  };
};
