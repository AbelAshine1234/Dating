export const sampleChats = [
  {
    id: '1',
    participants: ['user1', 'emma'],
    name: 'Emma Rodriguez',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: {
      id: '1',
      content: 'Hey! How was your hiking trip?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      senderId: 'emma'
    },
    unreadCount: 2,
    isOnline: true
  },
  {
    id: '2',
    participants: ['user1', 'alex'],
    name: 'Alex Thompson',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: {
      id: '2',
      content: 'That concert was amazing! 🎵',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      senderId: 'alex'
    },
    unreadCount: 0,
    isOnline: false
  },
  {
    id: '3',
    participants: ['user1', 'sophia'],
    name: 'Sophia Chen',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: {
      id: '3',
      content: 'Would love to check out that art gallery!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      senderId: 'user1'
    },
    unreadCount: 1,
    isOnline: true
  }
];

export const sampleMessages = {
  '1': [
    {
      id: 'm1',
      content: 'Hi Emma! Great to match with you 😊',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      senderId: 'user1'
    },
    {
      id: 'm2',
      content: 'Hey! Thanks, I saw you love hiking too!',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      senderId: 'emma'
    },
    {
      id: 'm3',
      content: 'Yes! Just got back from Mount Wilson. The views were incredible!',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      senderId: 'user1'
    },
    {
      id: 'm4',
      content: 'Hey! How was your hiking trip?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      senderId: 'emma'
    }
  ],
  '2': [
    {
      id: 'm5',
      content: 'That band recommendation was perfect!',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      senderId: 'user1'
    },
    {
      id: 'm6',
      content: 'I knew you\'d love them! Their live show is even better',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      senderId: 'alex'
    },
    {
      id: 'm7',
      content: 'That concert was amazing! 🎵',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      senderId: 'alex'
    }
  ],
  '3': [
    {
      id: 'm8',
      content: 'I saw you work in marketing! What kind of projects do you work on?',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      senderId: 'user1'
    },
    {
      id: 'm9',
      content: 'Mostly tech startups! I love the creative challenge. What about your photography?',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      senderId: 'sophia'
    },
    {
      id: 'm10',
      content: 'Would love to check out that art gallery!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      senderId: 'user1'
    }
  ]
};