import React from 'react';

const TopBar = ({ score, lines, level, gameStatus, onStart, onPause }) => {
  return (
    <div className="top-bar">
      <div className="game-title-small">테트리스</div>
      
      <div className="top-stats">
        <div className="top-stat">
          <span className="top-stat-label">점수</span>
          <span className="top-stat-value">{score}</span>
        </div>
        <div className="top-stat">
          <span className="top-stat-label">줄</span>
          <span className="top-stat-value">{lines}</span>
        </div>
        <div className="top-stat">
          <span className="top-stat-label">레벨</span>
          <span className="top-stat-value">{level}</span>
        </div>
      </div>

      <div className="game-buttons">
        {gameStatus === 'idle' && (
          <button className="game-btn-small start-btn" onClick={onStart}>
            시작
          </button>
        )}
        
        {gameStatus === 'playing' && (
          <button className="game-btn-small pause-btn" onClick={onPause}>
            일시정지
          </button>
        )}
        
        {gameStatus === 'paused' && (
          <button className="game-btn-small resume-btn" onClick={onPause}>
            계속
          </button>
        )}
        
        {gameStatus === 'over' && (
          <>
            <span className="game-over-small">게임 오버!</span>
            <button className="game-btn-small restart-btn" onClick={onStart}>
              다시 시작
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
