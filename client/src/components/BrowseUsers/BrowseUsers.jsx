import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/hooks";
import { userAPI } from "../../services/api";
import "./BrowseUsers.css";

const BrowseUsers = ({ onUserSelect, onBack }) => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    lookingFor: "",
  });
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await userAPI.browseUsers(filters);
      setUsers(response.users || []);
      setTotalUsers(response.total || 0);
    } catch (error) {
      setError("Failed to load users");
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleUserSelect = (selectedUser) => {
    if (onUserSelect) {
      onUserSelect(selectedUser);
    }
  };

  const clearFilters = () => {
    setFilters({
      gender: "",
      lookingFor: "",
    });
  };

  const getAvatarUrl = (user) => {
    if (user.Pictures && user.Pictures.length > 0) {
      return user.Pictures[0].url;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&size=200`;
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="browse-users-container">
      {/* Header */}
      <div className="browse-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Chat
        </button>
        <h2>Browse All Users</h2>
        <p>Find people to chat with ({totalUsers} users available)</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Gender:</label>
          <select 
            value={filters.gender} 
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Looking For:</label>
          <select 
            value={filters.lookingFor} 
            onChange={(e) => handleFilterChange('lookingFor', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="dating">Dating</option>
            <option value="marriage">Marriage</option>
          </select>
        </div>

        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadUsers} className="retry-btn">Retry</button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      )}

      {/* Users Grid */}
      {!loading && users.length === 0 && !error && (
        <div className="no-users">
          <h3>No users found</h3>
          <p>Try adjusting your filters or check back later.</p>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                <img 
                  src={getAvatarUrl(user)} 
                  alt={user.fullName}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&size=200`;
                  }}
                />
              </div>
              
              <div className="user-info">
                <h3>{user.fullName}</h3>
                <p className="user-age">{calculateAge(user.dateOfBirth)} years old</p>
                
                {user.occupation && (
                  <p className="user-occupation">💼 {user.occupation}</p>
                )}
                
                {user.education && (
                  <p className="user-education">🎓 {user.education}</p>
                )}

                <div className="user-tags">
                  <span className="tag gender">{user.gender}</span>
                  <span className="tag looking-for">{user.lookingFor}</span>
                </div>

                {user.description && (
                  <p className="user-description">
                    {user.description.length > 100 
                      ? `${user.description.substring(0, 100)}...` 
                      : user.description
                    }
                  </p>
                )}
              </div>

              <button 
                className="start-chat-btn"
                onClick={() => handleUserSelect(user)}
              >
                💬 Start Chat
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && users.length > 0 && totalUsers > users.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadUsers}>
            Load More Users
          </button>
        </div>
      )}
    </div>
  );
};

export default BrowseUsers; 