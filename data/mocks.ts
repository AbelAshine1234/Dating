import { User, Conversation, SuccessStory } from '../types';

export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: 25 + (i % 15),
  photoUrl: `https://picsum.photos/seed/${i + 1}/300/400`,
  videoPlaceholderUrl: `https://picsum.photos/seed/vid-${i + 1}/400/300`,
  phonePlaceholderUrl: `https://picsum.photos/seed/phone-${i+1}/400/400`,
  religion: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain'][i % 5],
  caste: `Caste ${i % 10}`,
  interests: [['Reading', 'Movies'], ['Sports', 'Travel'], ['Cooking', 'Music'], ['Gaming', 'Hiking']][i % 4],
  location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][i % 5],
  isPremium: i % 3 === 0,
  isVerified: i % 2 === 0,
  bio: `This is a sample bio for User ${i + 1}. Looking for a meaningful connection. I enjoy long walks on the beach and quiet nights in. My interests are varied and I'm always open to trying new things. Let's connect and see where things go.`,
  familyDetails: {
    type: i % 2 === 0 ? 'Nuclear' : 'Joint',
    fatherOccupation: 'Business',
    description: 'A close-knit family with traditional values and a modern outlook.'
  },
  lifestyle: {
    diet: i % 3 === 0 ? 'Vegetarian' : 'Non-Vegetarian',
    smoking: i % 5 === 0,
    drinking: i % 4 === 0
  },
  hobbies: [['Photography', 'Art'], ['Writing', 'Blogging'], ['Dancing', 'Singing']][i%3]
}));


export const mockConversations: Conversation[] = mockUsers.slice(1, 10).map(user => ({
    userId: user.id,
    userName: user.name,
    avatar: user.photoUrl,
    lastMessage: 'Hey, how are you doing? Hope to hear from you soon!',
    timestamp: `${(user.id % 12) + 1}h ago`,
    unreadCount: user.id % 3,
    messages: [
        { id: 1, senderId: user.id, text: 'Hi there!', timestamp: '10:00 AM' },
        { id: 2, senderId: 'me', text: 'Hello! How are you?', timestamp: '10:01 AM', read: true },
        { id: 3, senderId: user.id, text: 'I am good, thanks for asking! I saw your profile and was intrigued.', timestamp: '10:02 AM' },
    ]
}));

export const mockSuccessStories: SuccessStory[] = mockUsers.slice(20, 28).map((user, i) => ({
    id: i + 1,
    names: `${user.name} & Partner`,
    imageUrl: user.photoUrl,
    story: `We found each other on DateMatch and couldn't be happier. The process was simple...`,
    fullStory: `We found each other on DateMatch and couldn't be happier. The process was simple and effective. From the first message to our first date, everything felt right. The platform's focus on compatibility really helped us connect on a deeper level. We are now happily married and planning our future together. Thank you, DateMatch, for bringing us together! We would recommend this to anyone serious about finding a life partner.`
}))