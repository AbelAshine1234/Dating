# Dating App with Chat & Authentication

A full-stack dating application with real-time chat functionality, user authentication, and profile management.

## Features

### Backend Features
- ✅ User registration and login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ File upload support for user images
- ✅ Real-time chat messaging
- ✅ User profile management
- ✅ Conversation management
- ✅ Message read status tracking
- ✅ Database relationships with Sequelize

### Frontend Features
- ✅ Modern React UI with responsive design
- ✅ Redux state management
- ✅ Real-time chat interface
- ✅ User authentication flow
- ✅ Profile registration with image upload
- ✅ Conversation list and user selection
- ✅ Message history and real-time updates

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Sequelize** ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Multer** for file uploads
- **Cloudinary** for image storage

### Frontend
- **React** 17
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Bootstrap** and **Ant Design** for UI
- **Socket.io** for real-time features

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Cloudinary account (for image uploads)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd server/api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in `server/api/` with the following variables:
   ```env
   PORT=4000
   NODE_ENV=development
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=dating_app
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Set up the database:**
   - Create a PostgreSQL database named `dating_app`
   - The tables will be created automatically when you start the server

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file (optional):**
   Create a `.env` file in `client/` if you want to customize the API URL:
   ```env
   REACT_APP_API_URL=http://localhost:4000/api
   ```

4. **Start the frontend development server:**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get current user profile (protected)

### Users
- `GET /api/users/users` - Get all users (protected)

### Chat
- `POST /api/chats/send` - Send a message (protected)
- `GET /api/chats/user/:userId` - Get user's chats (protected)
- `GET /api/chats/conversation/:otherUserId` - Get conversation between users (protected)
- `GET /api/chats/unread-count` - Get unread message count (protected)
- `PUT /api/chats/mark-read/:senderId` - Mark messages as read (protected)

## Usage

1. **Register/Login:** Users can create accounts or log in with existing credentials
2. **Profile Management:** Users can upload images and update their profile information
3. **Chat:** Users can view all registered users and start conversations
4. **Real-time Messaging:** Send and receive messages in real-time
5. **Conversation History:** View all previous conversations and messages

## Database Schema

### Users Table
- `id` (Primary Key)
- `fullName`
- `email` (Unique)
- `password` (Hashed)
- `gender`
- `lookingFor`
- `dateOfBirth`
- `description`
- `occupation`
- `education`
- `religion`
- `caste`
- `interests`
- `callerId` (Unique)

### Chats Table
- `id` (Primary Key)
- `senderId` (Foreign Key to Users)
- `receiverId` (Foreign Key to Users)
- `message`
- `read` (Boolean)
- `createdAt`
- `updatedAt`

### Pictures Table
- `id` (Primary Key)
- `url`
- `publicId`
- `UserId` (Foreign Key to Users)

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Input validation and sanitization
- CORS configuration
- File upload security

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 