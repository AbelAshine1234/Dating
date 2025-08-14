import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  preferences: {
    notifications: {
      newMatches: true,
      messages: true,
      likes: true,
      superLikes: true,
    },
    privacy: {
      showOnlineStatus: true,
      showLastSeen: true,
      showDistance: true,
    },
    discovery: {
      showMeTo: 'everyone',
      ageRange: [18, 50],
      distance: 50,
      gender: 'all',
    },
  },
  photos: [],
  interests: [],
  bio: '',
  location: null,
  loading: false,
  error: null,
  subscription: {
    type: 'free',
    expiresAt: null,
    features: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateNotificationPreference: (state, action) => {
      const { key, value } = action.payload;
      state.preferences.notifications[key] = value;
    },
    updatePrivacyPreference: (state, action) => {
      const { key, value } = action.payload;
      state.preferences.privacy[key] = value;
    },
    updateDiscoveryPreference: (state, action) => {
      const { key, value } = action.payload;
      state.preferences.discovery[key] = value;
    },
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    addPhoto: (state, action) => {
      state.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos = state.photos.filter(photo => photo.id !== action.payload);
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
    addInterest: (state, action) => {
      if (!state.interests.includes(action.payload)) {
        state.interests.push(action.payload);
      }
    },
    removeInterest: (state, action) => {
      state.interests = state.interests.filter(interest => interest !== action.payload);
    },
    setBio: (state, action) => {
      state.bio = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
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
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    updateSubscription: (state, action) => {
      state.subscription = { ...state.subscription, ...action.payload };
    },
    clearUser: (state) => {
      state.profile = null;
      state.photos = [];
      state.interests = [];
      state.bio = '';
      state.location = null;
      state.subscription = {
        type: 'free',
        expiresAt: null,
        features: [],
      };
    },
  },
});

export const {
  setProfile,
  updateProfile,
  setPreferences,
  updateNotificationPreference,
  updatePrivacyPreference,
  updateDiscoveryPreference,
  setPhotos,
  addPhoto,
  removePhoto,
  setInterests,
  addInterest,
  removeInterest,
  setBio,
  setLocation,
  setLoading,
  setError,
  clearError,
  setSubscription,
  updateSubscription,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer; 