const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    googleId: {
      type: String,
      sparse: true,
    },
    profileImage: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ['email', 'google'],
      default: 'email',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    build: {
      cpu: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      cooler: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      motherboard: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      ram: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      storage: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      gpu: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      psu: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      case: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
      monitor: {
        id: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
