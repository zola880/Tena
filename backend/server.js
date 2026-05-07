require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

// ================= CORS (MUST BE FIRST) =================
const allowedOrigins = [
  'https://tena-d7oi.vercel.app'
];
const isVercelPreview = (origin) => /^https:\/\/.*\.vercel\.app$/.test(origin);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman/curl
    if (allowedOrigins.includes(origin) || isVercelPreview(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// ================= Security & Middleware =================
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= MongoDB =================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
    process.exit(1);
  }
};
connectDB();

// ================= Routes =================
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

// ================= Health Check =================
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ================= Error Handler (LAST) =================
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// ================= Start Server =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});