// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Load env vars
// dotenv.config();

// // Fallback logic for environment variables if .env is missing/not loaded
// if (!process.env.MONGO_URI) {
//   process.env.MONGO_URI = 'mongodb://localhost:27017/studentmate';
// }
// if (!process.env.JWT_SECRET) {
//   process.env.JWT_SECRET = 'your_jwt_secret_here';
// }

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/tasks', require('./routes/taskRoutes'));
// app.use('/api/studylogs', require('./routes/studyLogRoutes'));
// app.use('/api/moods', require('./routes/moodRoutes'));
// app.use('/api/ai', require('./routes/aiRoutes'));
// app.use('/api/subjects', require('./routes/subjectRoutes'));

// app.get('/', (req, res) => {
//   res.send('StudentMate AI API is running...');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Fallback ENV (Hamesha config ke baad)
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studentmate';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'studentmate_super_secret_key_123';

// DB connect
connectDB();

const app = express();

// ✅ FIXED CORS FOR VITE (5173) & REACT (3000)
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS Policy: This origin is not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.get('/', (req, res) => {
  res.send('StudentMate AI API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});