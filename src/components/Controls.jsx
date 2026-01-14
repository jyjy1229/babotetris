import React, { useRef, useCallback } from 'react';

const Controls = ({ onLeft, onRight, onRotate, onDown, disabled }) => {
  const intervalRef = useRef(null);
  const touchStartedRef = useRef(false);

  // 버튼 누르고 있을 때 반복 실행
  const handlePressStart = useCallback((e, callback, isRepeat = true) => {
    if (disabled) return;
    
    // 터치 이벤트인 경우에만 preventDefault
    if (e.type.startsWith('touch')) {
      e.preventDefault();
      touchStartedRef.current = true;
    }
    
    callback(); // 즉시 한 번 실행
    
    if (isRepeat) {
      intervalRef.current = setInterval(() => {
        callback();
      }, 50); // 50ms마다 반복 (더 빠른 반응)
    }
  }, [disabled]);

  const handlePressEnd = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // 짧은 딜레이 후 터치 플래그 리셋
    setTimeout(() => {
      touchStartedRef.current = false;
    }, 100);
  }, []);

  // 클릭 이벤트 핸들러 (터치가 아닌 경우에만)
  const handleClick = useCallback((e, callback) => {
    if (disabled) return;
    // 터치로 시작된 경우 클릭 무시
    if (touchStartedRef.current) {
      e.preventDefault();
      return;
    }
    callback();
  }, [disabled]);

  return (
    <div className="controls">
      <div className="controls-row">
        <button 
          className="control-btn rotate-btn"
          onClick={(e) => handleClick(e, onRotate)}
          onMouseDown={(e) => handlePressStart(e, onRotate, false)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, onRotate, false)}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
          disabled={disabled}
          aria-label="회전"
        >
          ↻
        </button>
      </div>
      <div className="controls-row">
        <button 
          className="control-btn"
          onClick={(e) => handleClick(e, onLeft)}
          onMouseDown={(e) => handlePressStart(e, onLeft)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, onLeft)}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
          disabled={disabled}
          aria-label="왼쪽"
        >
          ←
        </button>
        <button 
          className="control-btn"
          onClick={(e) => handleClick(e, onDown)}
          onMouseDown={(e) => handlePressStart(e, onDown)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, onDown)}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
          disabled={disabled}
          aria-label="아래"
        >
          ↓
        </button>
        <button 
          className="control-btn"
          onClick={(e) => handleClick(e, onRight)}
          onMouseDown={(e) => handlePressStart(e, onRight)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, onRight)}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
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
