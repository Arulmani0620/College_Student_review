const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});

    // Create sample users
    const users = [
      {
        userId: 'STU001',
        name: 'John Student',
        email: 'student@college.edu',
        password: 'password123',
        role: 'student',
        department: 'Computer Science'
      },
      {
        userId: 'FAC001',
        name: 'Dr. Jane Faculty',
        email: 'faculty@college.edu',
        password: 'password123',
        role: 'faculty',
        department: 'Computer Science'
      },
      {
        userId: 'ADM001',
        name: 'Admin User',
        email: 'admin@college.edu',
        password: 'password123',
        role: 'admin',
        department: 'Administration'
      }
    ];

    await User.insertMany(users);
    console.log('Sample users created successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();