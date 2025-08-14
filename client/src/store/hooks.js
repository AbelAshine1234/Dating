import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

// Custom hooks for specific slices
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useChat = () => {
  return useAppSelector((state) => state.chat);
};

export const useDating = () => {
  return useAppSelector((state) => state.dating);
};

export const useUser = () => {
  return useAppSelector((state) => state.user);
};

// Specific selectors
export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};

export const useCurrentUser = () => {
  return useAppSelector((state) => state.auth.user);
};

export const useCurrentConversation = () => {
  return useAppSelector((state) => state.chat.currentConversation);
};

export const useMessages = () => {
  return useAppSelector((state) => state.chat.messages);
};

export const useMatches = () => {
  return useAppSelector((state) => state.dating.matches);
};

export const useUserProfile = () => {
  return useAppSelector((state) => state.user.profile);
};

export const useUserPreferences = () => {
  return useAppSelector((state) => state.user.preferences);
};

export const useSubscription = () => {
  return useAppSelector((state) => state.user.subscription);
}; 