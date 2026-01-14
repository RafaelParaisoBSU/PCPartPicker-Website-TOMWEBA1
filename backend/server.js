const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: NODE_ENV === 'production' ? allowedOrigins : true,
  credentials: true
}));

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://rafaelparaisobsu:OmgItsMystic1@cluster0.bon9u.mongodb.net/pcpartpicker?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const ordersRouter = require('./routes/orders');
const contactsRouter = require('./routes/contacts');
const authRouter = require('./routes/auth');
const buildsRouter = require('./routes/builds');

app.use('/api/orders', ordersRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/builds', buildsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Environment: ${NODE_ENV}`);
  if (NODE_ENV === 'development') {
    console.log(`🌐 Frontend: http://localhost:5173`);
  }
});
