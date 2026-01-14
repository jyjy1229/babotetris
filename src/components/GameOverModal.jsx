import React, { useState } from "react";
import { saveScore } from "../utils/supabaseClient";
import "../styles/GameOverModal.css";

const GameOverModal = ({ score, onClose, onNavigateToLeaderboard }) => {
  const [playerName, setPlayerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError("이름을 입력해주세요");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await saveScore(playerName.trim(), score);
      alert("랭킹이 등록되었습니다!");
      onNavigateToLeaderboard();
    } catch (err) {
      console.error("Error saving score:", err);
      setError("랭킹 등록에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">게임 오버!</h2>
        <div className="modal-score">
          <p>최종 점수</p>
          <p className="score-value">{score}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="playerName">이름</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="이름을 입력하세요"
              maxLength={20}
              disabled={isSubmitting}
              autoFocus
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="modal-buttons">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "랭킹 등록"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameOverModal;
