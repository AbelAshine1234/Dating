const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Register user
  register: async (userData) => {
    const formData = new FormData();
    
    // Add text fields
    Object.keys(userData).forEach(key => {
      if (key !== 'images') {
        formData.append(key, userData[key]);
      }
    });
    
    // Add images if any
    if (userData.images) {
      userData.images.forEach(image => {
        formData.append('images', image);
      });
    }

    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  },

  // Login user
  login: async (credentials) => {
    return apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Get current user profile
  getProfile: async () => {
    return apiRequest('/users/profile');
  },
};

// Chat API functions
export const chatAPI = {
  // Send a message
  sendMessage: async (receiverId, message) => {
    return apiRequest('/chats/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId, message }),
    });
  },

  // Get all chats for current user
  getUserChats: async (userId) => {
    return apiRequest(`/chats/user/${userId}`);
  },

  // Get conversation between two users
  getConversation: async (otherUserId) => {
    return apiRequest(`/chats/conversation/${otherUserId}`);
  },

  // Get unread message count
  getUnreadCount: async () => {
    return apiRequest('/chats/unread-count');
  },

  // Mark messages as read
  markAsRead: async (senderId) => {
    return apiRequest(`/chats/mark-read/${senderId}`, {
      method: 'PUT',
    });
  },
};

// User API functions
export const userAPI = {
  // Get all users
  getAllUsers: async () => {
    return apiRequest('/users/users');
  },

  // Browse users with filters
  browseUsers: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    
    const endpoint = `/users/browse${params.toString() ? `?${params.toString()}` : ''}`;
    return apiRequest(endpoint);
  },
};

export default {
  auth: authAPI,
  chat: chatAPI,
  user: userAPI,
}; 