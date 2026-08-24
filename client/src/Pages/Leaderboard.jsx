import React, { useEffect, useState } from 'react';
import { CalendarClock, Layers, Medal, Trophy } from 'lucide-react';
import '../styles/Leaderboard.css';

const RESULT_RELEASE_TIME = new Date('2026-08-26T12:00:00+05:30').getTime();

const getTimeLeft = () => {
  const difference = RESULT_RELEASE_TIME - Date.now();

  if (difference <= 0) {
    return {
      isReleased: true,
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  const formatUnit = (value) => String(value).padStart(2, '0');

  return {
    isReleased: false,
    days: formatUnit(days),
    hours: formatUnit(hours),
    minutes: formatUnit(minutes),
    seconds: formatUnit(seconds),
  };
};

const Leaderboard = () => {
  const [selectedSem, setSelectedSem] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);
  
  const handleclickfor3=()=>{
    setSelectedSem('3th');
    setLeaderboardData([
      {
        rank:1,
        studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
        studentName:"Raju Yadav",
        userScore:"70",
      },
      {
      rank:2,
      studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784878061/user_profiles/e5kbx0ge7ece306mro0u.jpg",
      studentName:"Rana Tarafdar",
      userScore:"64",
      },
      {
    rank:3,
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1785114289/user_profiles/gboeujwushidt5tqp0dt.jpg",
    studentName:"Aritra kumar Baidya",
    userScore:"60",
  },
    {
    rank:4,
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1785352910/user_profiles/yypoqummj8k6faxxz8xq.webp",
    studentName:"Aryan Goldar",
    userScore:"58",
  },
    {
    rank:5,
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1785310770/user_profiles/s5gkimxquhw4lshggefe.png",
    studentName:"Shankhodeep Das",
    userScore:"47",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"2",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
    {
    rank:"1",
    studentProfileimage:"https://res.cloudinary.com/dcvejeszo/image/upload/v1784877432/user_profiles/vvscshxfm7sygix3npzv.jpg",
    studentName:"Raju Yadav",
    userScore:"70",
  },
])
}
const handleclickfor5=()=>{
  setSelectedSem('5th');
  setLeaderboardData([
    {
    studentProfileimage:"",
    studentName:"Tarapada Garai",
    userScore:"",
  },
])
}

  const handleGoBackToSelection = () => {
    setSelectedSem(null);
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return <Medal size={24} color="#FFD700" className="medal-icon" />;
    if (rank === 2) return <Medal size={24} color="#C0C0C0" className="medal-icon" />;
    if (rank === 3) return <Medal size={24} color="#CD7F32" className="medal-icon" />;
    return <span className="rank-number">{rank}</span>;
  };

  if (!timeLeft.isReleased) {
    const countdownUnits = [
      { label: 'Days', value: timeLeft.days },
      { label: 'Hours', value: timeLeft.hours },
      { label: 'Minutes', value: timeLeft.minutes },
      { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
      <div className="leaderboard-container">
        <div className="glow-blob top-left"></div>
        <div className="glow-blob bottom-right"></div>

        <div className="result-countdown-card fade-in-up" style={{ marginTop: "70px" }}>
          <div className="countdown-icon-ring">
            <Trophy size={42} color="#FFD700" />
          </div>

          <div className="countdown-copy">
            <p className="countdown-kicker">
              <CalendarClock size={18} />
              Result reveal
            </p>
            <h1 className="leaderboard-title">LEADERBOARD LOCKED</h1>
            <p className="selection-subtitle countdown-subtitle">
              Results will be visible on 26 August 2026 at 12:00 PM.
            </p>
          </div>

          <div className="countdown-grid" aria-label="Countdown to result reveal">
            {countdownUnits.map((unit) => (
              <div className="countdown-unit" key={unit.label}>
                <span className="countdown-value">{unit.value}</span>
                <span className="countdown-label">{unit.label}</span>
              </div>
            ))}
          </div>

          <p className="countdown-note">Keep your code sharp. The champions list is almost ready.</p>
        </div>
      </div>
    );
  }

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
            <div className="sem-card" onClick={handleclickfor3}>
              <div className="sem-card-icon">
                <Layers size={32} color="#FFD700" />
              </div>
              <h2>3rd Semester</h2>
              <p>Check the coding champions of the 3rd semester.</p>
              <button className="sem-select-btn">View Rankings →</button>
            </div>

            {/* 5th Sem Card */}
            <div className="sem-card" onClick={handleclickfor5}>
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
          {!isLoading && !error && leaderboardData.length === 0 && (
            <p className="leaderboard-message">No accepted participants found for {selectedSem} semester.</p>
          )}
          {!isLoading && !error && leaderboardData.map((user) => (
            <div key={user.rank} className={`list-row ${user.rank <= 3 ? 'top-rank' : ''}`}>
              <div className="col-rank">{getRankBadge(user.rank)}</div>
              <div className="col-user">
                <img src={user.studentProfileimage} alt={user.studentName} className="user-avatar" />
                <span className="user-name">{user.studentName}</span>
              </div>
              <div className="col-score">{user.userScore}/70</div>
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
