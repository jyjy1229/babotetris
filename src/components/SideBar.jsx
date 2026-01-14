import React from "react";

const SideBar = ({ score, lines, level, gameStatus, nextTetromino, onStart, onPause }) => {
  return (
    <div className="side-bar">
      <div className="side-title">바보 테트리스</div>

      {/* 다음 블록 표시 */}
      {nextTetromino && (
        <div className="next-tetromino-container">
          <div className="next-tetromino-label">다음 블록</div>
          <div className="next-tetromino-preview">
            {nextTetromino.shape.map((row, rowIdx) => (
              <div key={rowIdx} className="next-tetromino-row">
                {row.map((cell, cellIdx) => (
                  <div
                    key={cellIdx}
                    className={`next-tetromino-cell ${cell ? "filled" : "empty"}`}
                    style={{
                      backgroundImage: cell && nextTetromino.image 
                        ? `url(${nextTetromino.image})` 
                        : "none",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="side-stats">
        <div className="side-stat">
          <span className="side-stat-label">점수</span>
          <span className="side-stat-value">{score}</span>
        </div>
        <div className="side-stat">
          <span className="side-stat-label">줄</span>
          <span className="side-stat-value">{lines}</span>
        </div>
        <div className="side-stat">
          <span className="side-stat-label">레벨</span>
          <span className="side-stat-value">{level}</span>
        </div>
      </div>

      <div className="side-buttons">
        {gameStatus === "idle" && (
          <button className="side-btn start-btn" onClick={onStart}>
            게임 시작
          </button>
        )}

        {gameStatus === "playing" && (
          <button className="side-btn pause-btn" onClick={onPause}>
            일시정지
          </button>
        )}

        {gameStatus === "paused" && (
          <>
            <div className="pause-text-side">일시정지</div>
            <button className="side-btn resume-btn" onClick={onPause}>
              계속하기
            </button>
          </>
        )}

        {gameStatus === "over" && (
          <>
            <div className="game-over-text-side">게임 오버!</div>
            <button className="side-btn restart-btn" onClick={onStart}>
              다시 시작
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
