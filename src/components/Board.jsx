import React from 'react';

const CELL_SIZE = 35; // CSS의 셀 크기와 동일

const Board = ({ board, currentTetromino, position, gameStatus }) => {
  // 셀의 블록 타입 가져오기 (색상 또는 이미지 결정용)
  const getCellType = (rowIndex, colIndex) => {
    // 현재 블록이 있고, 게임 중이며, 해당 위치에 현재 블록이 있는지 확인
    if (currentTetromino && gameStatus === 'playing') {
      const { shape } = currentTetromino;
      const relRow = rowIndex - position.y;
      const relCol = colIndex - position.x;
      
      if (relRow >= 0 && relRow < shape.length && 
          relCol >= 0 && relCol < shape[0].length && 
          shape[relRow][relCol]) {
        return currentTetromino.type;
      }
    }
    return null;
  };

  // 셀 스타일 가져오기
  const getCellStyle = (cell, blockType) => {
    if (!cell && !blockType) {
      return { backgroundColor: 'transparent' };
    }

    // 현재 블록의 셀인 경우
    if (blockType && currentTetromino) {
      if (currentTetromino.image) {
        // 이미지가 있으면 배경 이미지로 사용
        return {
          backgroundImage: `url(${currentTetromino.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: currentTetromino.color // 폴백
        };
      } else {
        // 이미지가 없으면 색상만 사용
        return {
          backgroundColor: currentTetromino.color
        };
      }
    }

    // 고정된 블록의 셀인 경우
    if (cell) {
      // cell이 객체인 경우 (새로운 형식)
      if (typeof cell === 'object' && cell.color) {
        if (cell.image) {
          return {
            backgroundImage: `url(${cell.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: cell.color // 폴백
          };
        } else {
          return { backgroundColor: cell.color };
        }
      }
      // cell이 문자열인 경우 (이전 형식 - 색상만)
      return { backgroundColor: cell };
    }

    return { backgroundColor: 'transparent' };
  };

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => {
              const blockType = getCellType(rowIndex, colIndex);
              const isFilled = cell || blockType;
              const cellStyle = getCellStyle(cell, blockType);

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${isFilled ? 'filled' : 'empty'}`}
                  style={cellStyle}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
