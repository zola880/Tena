require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// ================= CORS =================
const allowedOrigins = [
  'https://tena-rbej.vercel.app',
  'https://tena-d7oi-nc1ku1aka-zola880s-projects.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server or Postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// ================= Security =================
app.use(helmet());

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

// ================= Middleware =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= MongoDB =================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// ================= Routes =================
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

// ================= Error Handling =================
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// ================= Health Check =================
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend running'
  });
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});