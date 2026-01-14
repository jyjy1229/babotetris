import React, { useRef, useCallback } from "react";

const Controls = ({ onLeft, onRight, onRotate, onDown, disabled }) => {
  const intervalRef = useRef(null);

  // 터치 시작 - 꾹 누르기 처리
  const handleTouchStart = useCallback(
    (e, callback, isRepeat = true) => {
      if (disabled) return;

      e.preventDefault();

      callback(); // 즉시 한 번 실행

      if (isRepeat) {
        // 화살표 버튼은 0.2초마다 반복
        intervalRef.current = setInterval(() => {
          callback();
        }, 200);
      }
    },
    [disabled]
  );

  // 터치 종료
  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
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
          onTouchStart={(e) => handleTouchStart(e, onRotate, false)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          disabled={disabled}
          aria-label="회전"
        >
          ↻
        </button>
      </div>
      <div className="controls-row">
        <button
          className="control-btn"
          onTouchStart={(e) => handleTouchStart(e, onLeft, true)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          disabled={disabled}
          aria-label="왼쪽"
        >
          ←
        </button>
        <button
          className="control-btn"
          onTouchStart={(e) => handleTouchStart(e, onDown, true)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          disabled={disabled}
          aria-label="아래"
        >
          ↓
        </button>
        <button
          className="control-btn"
          onTouchStart={(e) => handleTouchStart(e, onRight, true)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
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
