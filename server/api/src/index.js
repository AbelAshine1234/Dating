const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');           // <-- import cors
const sequelize = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());                       // <-- enable CORS for all routes (allow all origins)
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/users', recommendationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

// Health check
app.get('/', (req, res) => res.send('Dating API is running...'));

// Database connection & server start
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server running on port ${process.env.PORT || 4000}`)
    );
  })
  .catch(err => console.error('DB connection error:', err));
