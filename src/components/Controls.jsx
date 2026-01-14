import React, { useRef, useCallback } from "react";

const Controls = ({ onLeft, onRight, onRotate, onDown, disabled }) => {
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // 화살표 버튼 - 꾹 누르기 처리
  const handleArrowTouchStart = useCallback(
    (e, callback) => {
      if (disabled) return;

      e.preventDefault();

      callback(); // 즉시 첫 번째 실행

      // 0.5초 후에 연타 시작
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          callback();
        }, 200); // 0.2초마다 반복
      }, 500); // 첫 번째 실행 후 0.5초 대기
    },
    [disabled]
  );

  // 회전 버튼 - 한 번만 실행
  const handleRotateTouchStart = useCallback(
    (e, callback) => {
      if (disabled) return;
      e.preventDefault();
      callback();
    },
    [disabled]
  );

  // 터치 종료
  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();

    // 대기 중인 timeout 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 진행 중인 interval 취소
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
          onTouchStart={(e) => handleRotateTouchStart(e, onRotate)}
          disabled={disabled}
          aria-label="회전"
        >
          ↻
        </button>
      </div>
      <div className="controls-row">
        <button
          className="control-btn"
          onTouchStart={(e) => handleArrowTouchStart(e, onLeft)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          disabled={disabled}
          aria-label="왼쪽"
        >
          ←
        </button>
        <button
          className="control-btn"
          onTouchStart={(e) => handleArrowTouchStart(e, onDown)}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          disabled={disabled}
          aria-label="아래"
        >
          ↓
        </button>
        <button
          className="control-btn"
          onTouchStart={(e) => handleArrowTouchStart(e, onRight)}
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
