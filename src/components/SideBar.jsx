import React from 'react';

const SideBar = ({ score, lines, level, gameStatus, onStart, onPause }) => {
  return (
    <div className="side-bar">
      <div className="side-title">테트리스</div>
      
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
        {gameStatus === 'idle' && (
          <button className="side-btn start-btn" onClick={onStart}>
            게임 시작
          </button>
        )}
        
        {gameStatus === 'playing' && (
          <button className="side-btn pause-btn" onClick={onPause}>
            일시정지
          </button>
        )}
        
        {gameStatus === 'paused' && (
          <>
            <div className="pause-text-side">일시정지</div>
            <button className="side-btn resume-btn" onClick={onPause}>
              계속하기
            </button>
          </>
        )}
        
        {gameStatus === 'over' && (
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
