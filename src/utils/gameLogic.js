// 게임 상수
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// 빈 보드 생성
export const createEmptyBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
};

// 충돌 감지
export const checkCollision = (board, tetromino, position) => {
  const { shape } = tetromino;
  const { x, y } = position;

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newY = y + row;
        const newX = x + col;

        // 보드 경계 체크
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT
        ) {
          return true;
        }

        // 바닥 체크
        if (newY < 0) {
          continue;
        }

        // 다른 블록과 충돌 체크
        if (board[newY][newX]) {
          return true;
        }
      }
    }
  }

  return false;
};

// 테트로미노를 보드에 병합
export const mergeTetromino = (board, tetromino, position) => {
  const newBoard = board.map(row => [...row]);
  const { shape, color, image, type } = tetromino;
  const { x, y } = position;

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newY = y + row;
        const newX = x + col;
        if (newY >= 0 && newY < BOARD_HEIGHT && newX >= 0 && newX < BOARD_WIDTH) {
          // 색상, 이미지, 타입 정보를 모두 저장
          newBoard[newY][newX] = { color, image, type };
        }
      }
    }
  }

  return newBoard;
};

// 완성된 줄 확인 및 제거
export const clearLines = (board) => {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    const isFull = row.every(cell => cell !== null);
    if (isFull) {
      linesCleared++;
      return false;
    }
    return true;
  });

  // 제거된 줄만큼 빈 줄 추가
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  return { newBoard, linesCleared };
};

// 점수 계산
export const calculateScore = (linesCleared) => {
  const scores = {
    1: 100,
    2: 300,
    3: 500,
    4: 800
  };
  return scores[linesCleared] || 0;
};

// 게임 오버 확인
export const isGameOver = (board) => {
  // 맨 위 줄에 블록이 있으면 게임 오버
  return board[0].some(cell => cell !== null);
};
