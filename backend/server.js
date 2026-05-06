require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ✅ CORS
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection (FIXED)
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

// ✅ Routes
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

// ✅ Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});