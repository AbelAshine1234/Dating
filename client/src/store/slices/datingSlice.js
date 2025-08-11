import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: [],
  currentProfile: null,
  matches: [],
  likes: [],
  dislikes: [],
  superLikes: [],
  loading: false,
  error: null,
  filters: {
    ageRange: [18, 50],
    distance: 50,
    gender: 'all',
    interests: [],
  },
  recommendations: [],
  isMarriageMode: false,
};

const datingSlice = createSlice({
  name: 'dating',
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
    },
    removeProfile: (state, action) => {
      state.profiles = state.profiles.filter(profile => profile.id !== action.payload);
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    addMatch: (state, action) => {
      state.matches.unshift(action.payload);
    },
    removeMatch: (state, action) => {
      state.matches = state.matches.filter(match => match.id !== action.payload);
    },
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
    addLike: (state, action) => {
      state.likes.push(action.payload);
    },
    setDislikes: (state, action) => {
      state.dislikes = action.payload;
    },
    addDislike: (state, action) => {
      state.dislikes.push(action.payload);
    },
    setSuperLikes: (state, action) => {
      state.superLikes = action.payload;
    },
    addSuperLike: (state, action) => {
      state.superLikes.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        ageRange: [18, 50],
        distance: 50,
        gender: 'all',
        interests: [],
      };
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    addRecommendation: (state, action) => {
      state.recommendations.push(action.payload);
    },
    removeRecommendation: (state, action) => {
      state.recommendations = state.recommendations.filter(rec => rec.id !== action.payload);
    },
    setMarriageMode: (state, action) => {
      state.isMarriageMode = action.payload;
    },
    clearDating: (state) => {
      state.profiles = [];
      state.currentProfile = null;
      state.matches = [];
      state.likes = [];
      state.dislikes = [];
      state.superLikes = [];
      state.recommendations = [];
    },
  },
});

export const {
  setProfiles,
  addProfile,
  removeProfile,
  setCurrentProfile,
  setMatches,
  addMatch,
  removeMatch,
  setLikes,
  addLike,
  setDislikes,
  addDislike,
  setSuperLikes,
  addSuperLike,
  setLoading,
  setError,
  clearError,
  setFilters,
  resetFilters,
  setRecommendations,
  addRecommendation,
  removeRecommendation,
  setMarriageMode,
  clearDating,
} = datingSlice.actions;

export default datingSlice.reducer; 