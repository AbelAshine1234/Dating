import React, { useState } from 'react';
import { useAppDispatch, useAuth, useDating, useUser } from '../../store/hooks';
import { 
  loginSuccess, 
  logout, 
  addMatch, 
  setFilters,
  updateProfile 
} from '../../store/slices/authSlice';
import { addMatch as addDatingMatch } from '../../store/slices/datingSlice';
import { updateProfile as updateUserProfile } from '../../store/slices/userSlice';
import './ReduxExample.css';

const ReduxExample = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAuth();
  const { matches, filters } = useDating();
  const { profile } = useUser();

  const [demoUser, setDemoUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
  });

  const handleLogin = () => {
    dispatch(loginSuccess({
      user: demoUser,
      token: 'demo-token-123'
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddMatch = () => {
    const newMatch = {
      id: Date.now(),
      name: 'Jane Smith',
      age: 23,
      photo: 'https://via.placeholder.com/150',
      timestamp: new Date().toISOString()
    };
    dispatch(addDatingMatch(newMatch));
  };

  const handleUpdateFilters = () => {
    dispatch(setFilters({
      ageRange: [20, 30],
      distance: 25,
      gender: 'female'
    }));
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile({
      bio: 'Updated bio from Redux!',
      interests: ['travel', 'music', 'cooking']
    }));
  };

  return (
    <div className="redux-example">
      <h2>Redux Integration Example</h2>
      
      <div className="section">
        <h3>Authentication State</h3>
        {isAuthenticated ? (
          <div>
            <p>✅ Logged in as: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p>❌ Not logged in</p>
            <button onClick={handleLogin} className="btn btn-success" disabled={loading}>
              {loading ? 'Logging in...' : 'Login Demo User'}
            </button>
          </div>
        )}
      </div>

      <div className="section">
        <h3>Dating State</h3>
        <p>Matches: {matches.length}</p>
        <p>Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}</p>
        <p>Distance: {filters.distance} km</p>
        <p>Gender: {filters.gender}</p>
        
        <div className="button-group">
          <button onClick={handleAddMatch} className="btn btn-primary">
            Add Demo Match
          </button>
          <button onClick={handleUpdateFilters} className="btn btn-info">
            Update Filters
          </button>
        </div>
      </div>

      <div className="section">
        <h3>User Profile State</h3>
        <p>Bio: {profile?.bio || 'No bio set'}</p>
        <p>Interests: {profile?.interests?.join(', ') || 'No interests set'}</p>
        
        <button onClick={handleUpdateProfile} className="btn btn-warning">
          Update Profile
        </button>
      </div>

      <div className="section">
        <h3>Redux DevTools</h3>
        <p>Open your browser's Redux DevTools extension to see the state changes in real-time!</p>
        <p>You can also use the browser console to inspect the Redux store:</p>
        <code>window.store.getState()</code>
      </div>
    </div>
  );
};

export default ReduxExample; 