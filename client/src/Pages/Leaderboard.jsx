import React, { useEffect, useMemo, useState } from 'react';
import { Medal, Layers } from 'lucide-react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [selectedSem, setSelectedSem] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v4/event-data/leaderboard`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to load leaderboard data.');
        }

        setLeaderboardData(result.data || []);
      } catch (requestError) {
        setError(requestError.message || 'Unable to load leaderboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const semesterLeaderboard = useMemo(() => {
    if (!selectedSem) return [];

    return leaderboardData
      .filter((participant) =>
        new RegExp(`\\(${selectedSem}\\s+Semester\\)`, 'i').test(participant.eventName)
      )
      .map((participant, index) => ({ ...participant, rank: index + 1 }));
  }, [leaderboardData, selectedSem]);

  const handleGoBackToSelection = () => {
    setSelectedSem(null);
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return <Medal size={24} color="#FFD700" className="medal-icon" />;
    if (rank === 2) return <Medal size={24} color="#C0C0C0" className="medal-icon" />;
    if (rank === 3) return <Medal size={24} color="#CD7F32" className="medal-icon" />;
    return <span className="rank-number">{rank}</span>;
  };

  if (!selectedSem) {
    return (
      <div className="leaderboard-container">
        <div className="glow-blob top-left"></div>
        <div className="glow-blob bottom-right"></div>

        <div className="selection-wrapper fade-in-up" style={{ marginTop: "70px" }}>
          <h1 className="leaderboard-title">VIEW LEADERBOARD</h1>
          <p className="selection-subtitle">Select your semester to see the current rankings</p>

          <div className="semester-cards-container">
            {/* 3rd Sem Card */}
            <div className="sem-card" onClick={() => setSelectedSem('3rd')}>
              <div className="sem-card-icon">
                <Layers size={32} color="#FFD700" />
              </div>
              <h2>3rd Semester</h2>
              <p>Check the coding champions of the 3rd semester.</p>
              <button className="sem-select-btn">View Rankings →</button>
            </div>

            {/* 5th Sem Card */}
            <div className="sem-card" onClick={() => setSelectedSem('5th')}>
              <div className="sem-card-icon">
                <Layers size={32} color="#FFD700" />
              </div>
              <h2>5th Semester</h2>
              <p>Check the coding champions of the 5th semester.</p>
              <button className="sem-select-btn">View Rankings →</button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="glow-blob top-left"></div>
      <div className="glow-blob bottom-right"></div>

      <div className="leaderboard-card fade-in-up" style={{ marginTop: "70px" }}>
        
        <div className="leaderboard-header">
          <h1 className="leaderboard-title">{selectedSem} SEM LEADERBOARD</h1>
          <p className="tagline">Code . Compile . Win</p>
        </div>

        <div className="leaderboard-list">
          <div className="list-header">
            <div className="col-rank">Rank</div>
            <div className="col-user">User</div>
            <div className="col-score">Score</div>
          </div>

          {isLoading && <p className="leaderboard-message">Loading leaderboard...</p>}
          {!isLoading && error && <p className="leaderboard-message error-message">{error}</p>}
          {!isLoading && !error && semesterLeaderboard.length === 0 && (
            <p className="leaderboard-message">No accepted participants found for {selectedSem} semester.</p>
          )}
          {!isLoading && !error && semesterLeaderboard.map((user) => (
            <div key={user._id} className={`list-row ${user.rank <= 3 ? 'top-rank' : ''}`}>
              <div className="col-rank">{getRankBadge(user.rank)}</div>
              <div className="col-user">
                <img src={user.studentProfileimage} alt={user.studentName} className="user-avatar" />
                <span className="user-name">{user.studentName}</span>
              </div>
              <div className="col-score">{user.userScore}</div>
            </div>
          ))}
        </div>
        
        {/* Button to go back to semester selection instead of previous page */}
        <button className="back-btn-outline" onClick={handleGoBackToSelection}>
          ← Back to Semesters
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
