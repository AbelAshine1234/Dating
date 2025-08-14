import { User, ChatPreview, ChatRoomData } from '../types';

export const filterData = {
    hindu: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Dalit', 'Other'],
    muslim: ['Syed', 'Mughal', 'Pathan', 'Ansari', 'Qureshi', 'Other'],
    christian: ['RC-SC', 'RC-BC', 'RC-MBC', 'Others'],
    sikh: ['Jat', 'Khatri', 'Arora', 'Ramgarhia', 'Other'],
    buddhist: ['Navayana', 'Mahayana', 'Theravada', 'Vajrayana'],
    jain: ['Digambar', 'Shwetambar', 'Other'],
    other: ['Other']
};


export const sampleUsers: User[] = [
  { id: 1, name: 'Aria', age: 26, occupation: 'Graphic Designer', location: 'Neo-Tokyo', marriageGoals: 'Find a creative partner for life.', image: 'https://picsum.photos/id/1027/400/600', religion: 'other', caste: 'Other' },
  { id: 2, name: 'Leo', age: 29, occupation: 'AI Ethicist', location: 'Cyberia', marriageGoals: 'A partnership built on intellectual and emotional connection.', image: 'https://picsum.photos/id/1005/400/600', religion: 'hindu', caste: 'Brahmin' },
  { id: 3, name: 'Zara', age: 24, occupation: 'Bio-Engineer', location: 'Olympus City', marriageGoals: 'Someone adventurous to explore the world with.', image: 'https://picsum.photos/id/237/400/600', religion: 'muslim', caste: 'Syed' },
  { id: 4, name: 'Kai', age: 31, occupation: 'VR Architect', location: 'Aethelgard', marriageGoals: 'Build a beautiful life and family, both real and virtual.', image: 'https://picsum.photos/id/1011/400/600', religion: 'sikh', caste: 'Jat' },
  { id: 5, name: 'Nia', age: 27, occupation: 'Data Artist', location: 'Neo-Tokyo', image: 'https://picsum.photos/id/1012/400/600', religion: 'hindu', caste: 'Kshatriya' },
  { id: 6, name: 'Rohan', age: 28, occupation: 'Hovercraft Pilot', location: 'Cyberia', image: 'https://picsum.photos/id/1013/400/600', religion: 'hindu', caste: 'Vaishya' },
  { id: 7, name: 'Elara', age: 25, occupation: 'Stellar Cartographer', location: 'Olympus City', image: 'https://picsum.photos/id/1014/400/600', religion: 'christian', caste: 'RC-BC' },
  { id: 8, name: 'Jax', age: 30, occupation: 'Cyber-Ninja', location: 'Aethelgard', image: 'https://picsum.photos/id/1025/400/600', religion: 'buddhist', caste: 'Navayana' }
];

export const sampleChatPreviews: ChatPreview[] = [
  { id: 1, user: sampleUsers[0], lastMessage: 'Hey! Loved your profile.', timestamp: '10m ago', unreadCount: 2, isOnline: true },
  { id: 2, user: sampleUsers[2], lastMessage: 'That VR gallery you designed is amazing!', timestamp: '1h ago', unreadCount: 0, isOnline: false },
  { id: 3, user: sampleUsers[4], lastMessage: 'Coffee this week?', timestamp: 'yesterday', unreadCount: 0, isOnline: true },
  { id: 4, user: sampleUsers[6], lastMessage: 'You free for a video call later?', timestamp: 'yesterday', unreadCount: 1, isOnline: false },
];

export const sampleChatRooms: ChatRoomData[] = [
  {
    id: 1,
    user: sampleUsers[0],
    messages: [
      { id: 1, senderId: 99, text: 'Your art is incredible!', timestamp: '11:01 AM' },
      { id: 2, senderId: 1, text: 'Thank you! I saw you are a musician, that is so cool.', timestamp: '11:02 AM' },
      { id: 3, senderId: 1, text: 'Hey! Loved your profile.', timestamp: '11:05 AM' }
    ]
  },
  {
    id: 2,
    user: sampleUsers[2],
    messages: [
      { id: 1, senderId: 99, text: 'Hi Zara!', timestamp: '9:30 AM' },
      { id: 2, senderId: 2, text: 'That VR gallery you designed is amazing!', timestamp: '9:32 AM' }
    ]
  }
];

// Current user mock
export const currentUser: User = {
    id: 99, name: 'Alex', age: 28, image: 'https://picsum.photos/id/1015/400/400'
}