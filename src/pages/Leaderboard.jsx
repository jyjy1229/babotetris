import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../utils/supabaseClient";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const data = await getLeaderboard(20); // 상위 20개 가져오기
      setLeaderboardData(data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("랭킹 데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <h1 className="leaderboard-title">🏆 리더보드 🏆</h1>
        
        <button className="back-button" onClick={() => navigate("/")}>
          ← 게임으로 돌아가기
        </button>

        {isLoading && (
          <div className="loading">
            <p>로딩 중...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <p>{error}</p>
            <button onClick={fetchLeaderboard} className="retry-button">
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !error && leaderboardData.length === 0 && (
          <div className="empty-state">
            <p>아직 등록된 점수가 없습니다.</p>
            <p>첫 번째 기록을 남겨보세요!</p>
          </div>
        )}

        {!isLoading && !error && leaderboardData.length > 0 && (
          <div className="leaderboard-table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th className="rank-col">순위</th>
                  <th className="name-col">이름</th>
                  <th className="score-col">점수</th>
                  <th className="date-col">날짜</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => {
                  const rank = index + 1;
                  const medal = getMedalEmoji(rank);
                  
                  return (
                    <tr key={entry.id} className={`rank-${rank}`}>
                      <td className="rank-col">
                        {medal ? (
                          <span className="medal">{medal}</span>
                        ) : (
                          <span className="rank-number">{rank}</span>
                        )}
                      </td>
                      <td className="name-col">{entry.player_name}</td>
                      <td className="score-col">{entry.score.toLocaleString()}</td>
                      <td className="date-col">{formatDate(entry.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
