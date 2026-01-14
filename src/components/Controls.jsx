import React, { useRef, useCallback } from 'react';

const Controls = ({ onLeft, onRight, onRotate, onDown, disabled }) => {
  const intervalRef = useRef(null);

  // 버튼 누르고 있을 때 반복 실행
  const handleTouchStart = useCallback((callback, isRepeat = true) => {
    if (disabled) return;
    
    callback(); // 즉시 한 번 실행
    
    if (isRepeat) {
      intervalRef.current = setInterval(() => {
        callback();
      }, 100); // 100ms마다 반복
    }
  }, [disabled]);

  const handleTouchEnd = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 버튼에서 손가락이 벗어났을 때도 정지
  const handleTouchCancel = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  return (
    <div className="controls">
      <div className="controls-row">
        <button 
          className="control-btn rotate-btn"
          onClick={onRotate}
          onTouchStart={() => handleTouchStart(onRotate, false)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          disabled={disabled}
          aria-label="회전"
        >
          ↻
        </button>
      </div>
      <div className="controls-row">
        <button 
          className="control-btn"
          onClick={onLeft}
          onTouchStart={() => handleTouchStart(onLeft)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          disabled={disabled}
          aria-label="왼쪽"
        >
          ←
        </button>
        <button 
          className="control-btn"
          onClick={onDown}
          onTouchStart={() => handleTouchStart(onDown)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          disabled={disabled}
          aria-label="아래"
        >
          ↓
        </button>
        <button 
          className="control-btn"
          onClick={onRight}
          onTouchStart={() => handleTouchStart(onRight)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          disabled={disabled}
          aria-label="오른쪽"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Controls;
