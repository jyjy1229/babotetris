import React from 'react';

const GameInfo = ({ score, lines, level, gameStatus, onStart, onPause }) => {
  return (
    <div className="game-info">
      <h1 className="game-title">테트리스</h1>
      
      <div className="stats">
        <div className="stat">
          <span className="stat-label">점수</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">줄</span>
          <span className="stat-value">{lines}</span>
        </div>
        <div className="stat">
          <span className="stat-label">레벨</span>
          <span className="stat-value">{level}</span>
        </div>
      </div>

      <div className="game-controls">
        {gameStatus === 'idle' && (
          <button className="game-btn start-btn" onClick={onStart}>
            게임 시작
          </button>
        )}
        
        {gameStatus === 'playing' && (
          <button className="game-btn pause-btn" onClick={onPause}>
            일시정지
          </button>
        )}
        
        {gameStatus === 'paused' && (
          <>
            <div className="pause-text">일시정지</div>
            <button className="game-btn resume-btn" onClick={onPause}>
              계속하기
            </button>
          </>
        )}
        
        {gameStatus === 'over' && (
          <>
            <div className="game-over-text">게임 오버!</div>
            <button className="game-btn restart-btn" onClick={onStart}>
              다시 시작
            </button>
          </>
        )}
      </div>

      <div className="instructions">
        <h3>조작법</h3>
        <div className="instruction-section">
          <strong>키보드:</strong>
          <ul>
            <li>← → : 이동</li>
            <li>↑ : 회전</li>
            <li>↓ : 빠른 낙하</li>
            <li>Space : 즉시 낙하</li>
            <li>P : 일시정지</li>
          </ul>
        </div>
        <div className="instruction-section">
          <strong>모바일:</strong>
          <p>하단 버튼 사용</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
