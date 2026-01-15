const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  // Development mode - just return API message
  app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Serving full-stack app at http://localhost:${PORT}`);
  } else {
    console.log(`📱 Backend API: http://localhost:${PORT}`);
    console.log(`🌐 Frontend: http://localhost:5173`);
  }
});
