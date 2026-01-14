import React, { useRef, useCallback } from 'react';

const Controls = ({ onLeft, onRight, onRotate, onDown, disabled }) => {
  const intervalRef = useRef(null);

  // 버튼 누르고 있을 때 반복 실행
  const handlePressStart = useCallback((e, callback, isRepeat = true) => {
    if (disabled) return;
    
    // 이벤트 기본 동작 방지
    e.preventDefault();
    
    callback(); // 즉시 한 번 실행
    
    if (isRepeat) {
      intervalRef.current = setInterval(() => {
        callback();
      }, 200); // 200ms(0.2초)마다 반복
    }
  }, [disabled]);

  const handlePressEnd = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <div className="controls">
      <div className="controls-row">
        <button 
          className="control-btn rotate-btn"
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
          onMouseDown={(e) => handlePressStart(e, onLeft, true)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, onLeft, true)}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
          disabled={disabled}
          aria-label="왼쪽"
        >
          ←
        </button>
        <button 
          className="control-btn"
          onMouseDown={(e) => handlePressStart(e, onDown, true)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, onDown, true)}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
          disabled={disabled}
          aria-label="아래"
        >
          ↓
        </button>
        <button 
          className="control-btn"
          onMouseDown={(e) => handlePressStart(e, onRight, true)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={(e) => handlePressStart(e, onRight, true)}
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
