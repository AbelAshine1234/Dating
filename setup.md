# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Backend Setup

1. **Navigate to backend:**
   ```bash
   cd server/api
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env
   ```

3. **Edit .env file** with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=dating_app
   DB_USER=postgres
   DB_PASSWORD=your_actual_password
   JWT_SECRET=my_secret_key_123
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the app:**
   ```bash
   npm start
   ```

## 🎯 Test the App

1. **Open your browser** to `http://localhost:3000`
2. **Register a new account** with your details
3. **Login** with your credentials
4. **Explore the chat feature** and other functionality

## 🔧 Troubleshooting

### If you get database errors:
- Make sure PostgreSQL is running
- Create the database: `createdb dating_app`
- Check your database credentials in `.env`

### If you get CORS errors:
- Make sure the backend is running on port 4000
- Check that `CORS_ORIGIN=http://localhost:3000` is in your `.env`

### If the app doesn't load:
- Check that both frontend (port 3000) and backend (port 4000) are running
- Check browser console for errors

## 📱 Features Available

- ✅ User Registration & Login
- ✅ Real-time Chat Messaging
- ✅ User Profile Management
- ✅ Conversation History
- ✅ Modern UI/UX

## 🎉 You're Ready!

The app should now be fully functional with authentication and chat features! 