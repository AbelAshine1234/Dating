# Redux Store Setup

This directory contains the Redux store configuration for the dating app.

## Structure

```
store/
├── index.js              # Main store configuration
├── hooks.js              # Custom Redux hooks
├── slices/
│   ├── authSlice.js      # Authentication state
│   ├── chatSlice.js      # Chat and messaging state
│   ├── datingSlice.js    # Dating profiles and matches
│   └── userSlice.js      # User profile and preferences
└── README.md             # This file
```

## Slices Overview

### Auth Slice (`authSlice.js`)
Manages authentication state including:
- User login/logout
- Registration
- Token management
- Loading states
- Error handling

**Key Actions:**
- `loginStart`, `loginSuccess`, `loginFailure`
- `registerStart`, `registerSuccess`, `registerFailure`
- `logout`
- `updateUser`

### Chat Slice (`chatSlice.js`)
Manages chat functionality including:
- Conversations list
- Messages
- Online users
- Typing indicators

**Key Actions:**
- `setConversations`, `addConversation`
- `setMessages`, `addMessage`, `updateMessage`
- `setOnlineUsers`, `addOnlineUser`, `removeOnlineUser`
- `setTypingUser`

### Dating Slice (`datingSlice.js`)
Manages dating features including:
- User profiles
- Matches
- Likes/dislikes/super likes
- Filters and preferences
- Recommendations

**Key Actions:**
- `setProfiles`, `addProfile`, `removeProfile`
- `setMatches`, `addMatch`
- `setLikes`, `addLike`, `setDislikes`, `addDislike`
- `setFilters`, `resetFilters`
- `setMarriageMode`

### User Slice (`userSlice.js`)
Manages user profile and preferences including:
- Profile information
- Photos
- Interests
- Notification preferences
- Privacy settings
- Subscription data

**Key Actions:**
- `setProfile`, `updateProfile`
- `setPhotos`, `addPhoto`, `removePhoto`
- `setInterests`, `addInterest`, `removeInterest`
- `updateNotificationPreference`
- `updatePrivacyPreference`
- `setSubscription`

## Usage Examples

### Using Redux in Components

```jsx
import React from 'react';
import { useAppDispatch, useAuth, useDating } from '../store/hooks';
import { loginSuccess, addMatch } from '../store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuth();
  const { matches } = useDating();

  const handleLogin = (userData) => {
    dispatch(loginSuccess(userData));
  };

  const handleNewMatch = (match) => {
    dispatch(addMatch(match));
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
      <p>You have {matches.length} matches</p>
    </div>
  );
};
```

### Using Custom Hooks

```jsx
import { useIsAuthenticated, useCurrentUser, useMatches } from '../store/hooks';

const ProfileComponent = () => {
  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();
  const matches = useMatches();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>{currentUser.name}'s Profile</h1>
      <p>Matches: {matches.length}</p>
    </div>
  );
};
```

### Async Actions with Redux Toolkit

For API calls, you can use `createAsyncThunk`:

```jsx
// In a slice file
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
```

## Best Practices

1. **Use Custom Hooks**: Always use the custom hooks from `hooks.js` instead of plain `useSelector` and `useDispatch`.

2. **Keep Actions Simple**: Actions should be simple and descriptive. Use `createAsyncThunk` for complex async operations.

3. **Normalize Data**: For complex data structures, consider normalizing the state using libraries like `normalizr`.

4. **Persist Important Data**: Use `redux-persist` for data that should survive page refreshes (like authentication tokens).

5. **Error Handling**: Always handle loading and error states in your components.

6. **Type Safety**: Consider using TypeScript for better type safety with Redux.

## Integration with Existing Components

To integrate Redux with your existing components:

1. Import the necessary hooks and actions
2. Replace local state with Redux state where appropriate
3. Use `dispatch` to trigger actions
4. Update your components to read from the Redux store

Example integration:

```jsx
// Before (local state)
const [user, setUser] = useState(null);

// After (Redux state)
const { user } = useAuth();
const dispatch = useAppDispatch();

// Instead of setUser(newUser)
dispatch(loginSuccess({ user: newUser, token: newToken }));
``` 