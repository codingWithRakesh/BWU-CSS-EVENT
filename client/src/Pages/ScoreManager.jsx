import React, { useState } from 'react';
import { Search, Upload, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import secureLocalStorage from 'react-secure-storage';
import '../styles/ScoreManager.css';

const ScoreManager = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [newScore, setNewScore] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [message, setMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const getAuthHeaders = async () => {
    const localToken = secureLocalStorage.getItem('auth-token');
    if (localToken) return { 'auth-token': localToken };

    const firebaseToken = await user?.getIdToken();
    return firebaseToken ? { Authorization: `Bearer ${firebaseToken}` } : {};
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsUpdated(false);
    setMessage('');
    setStudentData(null);

    try {
      setIsSearching(true);
      const headers = await getAuthHeaders();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v4/event-data/participant?email=${encodeURIComponent(searchEmail.trim())}`,
        { headers }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to find participant.');
      }

      setStudentData(result.data);
    } catch (error) {
      setMessage(error.message || 'Unable to find participant.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUpdateMarks = async () => {
    if (!studentData || newScore === '') return;

    setIsUpdated(false);
    setMessage('');

    try {
      setIsSaving(true);
      const headers = await getAuthHeaders();
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v4/event-data/participant/${studentData._id}/score`,
        {
          method: 'PUT',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ score: newScore })
        }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to update marks.');
      }

      setStudentData(result.data);
      setNewScore('');
      setIsUpdated(true);
    } catch (error) {
      setMessage(error.message || 'Unable to update marks.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="admin-container">
      {/* Background Decorative Glows */}
      <div className="glow-blob top-left"></div>
      <div className="glow-blob bottom-right"></div>

      <div className="admin-card fade-in-up" style={{ marginTop: "70px" }}>
        <div className="admin-header">
          <h1 className="admin-title">UPDATE MARKS</h1>
          <p className="tagline">Search . Evaluate . Score</p>
        </div>

        {/* Search Section */}
        <form onSubmit={handleSearch} className="search-section">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input 
              type="email" 
              placeholder="Search student by email..." 
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="search-input"
              required
            />
          </div>
          <button type="submit" className="action-btn primary-btn">
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {message && <p className="score-manager-message error-message">{message}</p>}

        {/* Student Result Card */}
        {studentData && (
          <div className="student-result-card">
            
            {/* Student Info Top Row */}
            <div className="student-profile-header">
              <img 
                src={studentData.studentProfileimage} 
                alt={studentData.studentName} 
                className="student-avatar-large" 
              />
              <div className="student-basic-info">
                <h2>{studentData.studentName}</h2>
                <span className="student-email">{studentData.studentGmail}</span>
              </div>
            </div>

            {/* Student Details Grid */}
            <div className="student-details-grid">
              <div className="detail-item">
                <span className="detail-label">Event</span>
                <span className="detail-value">{studentData.eventName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Student Code</span>
                <span className="detail-value">{studentData.studentCode}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Section</span>
                <span className="detail-value">{studentData.studentSecation}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Score</span>
                <span className="detail-value highlight-score">{studentData.userScore}</span>
              </div>
            </div>

            {/* Score Update Section */}
            <div className="score-update-section">
              <input 
                type="number" 
                placeholder="Enter new marks" 
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                className="score-input"
                min="0"
              />
              <button 
                type="button" 
                className="action-btn success-btn" 
                onClick={handleUpdateMarks}
                disabled={isSaving || newScore === ''}
              >
                <Upload size={18} />
                {isSaving ? 'Updating...' : 'Upload Marks'}
              </button>
            </div>

            {/* Success Message */}
            {isUpdated && (
              <div className="success-message">
                <CheckCircle2 size={18} />
                Marks updated successfully!
              </div>
            )}
          </div>
        )}

        <button className="back-btn-outline" onClick={handleGoBack} style={{ marginTop: '30px' }}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ScoreManager;
