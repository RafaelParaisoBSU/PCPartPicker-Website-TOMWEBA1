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

app.use('/api/orders', ordersRouter);
app.use('/api/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Backend API: http://localhost:${PORT}`);
  console.log(`🌐 Frontend: http://localhost:5173`);
});
