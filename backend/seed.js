import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const sampleProducts = [
  {
    name: 'Fresh Organic Carrots',
    image: 'https://images.unsplash.com/photo-1598170845058-32b996a69f76?auto=format&fit=crop&w=500&q=80',
    price: 2.50,
    category: 'Vegetables',
    description: 'Crunchy, sweet, and packed with nutrients. Perfect for salads or cooking.',
  },
  {
    name: 'Red Gala Apples',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&q=80',
    price: 3.99,
    category: 'Fruits',
    description: 'Crisp and sweet premium quality hand-picked red apples.',
  },
  {
    name: 'Chocolate Fudge Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80',
    price: 15.00,
    category: 'Cakes',
    description: 'Rich triple-layer chocolate cake coated in smooth fudge frosting.',
  },
  {
    name: 'Premium Chocolate Chip Biscuits',
    image: 'https://images.unsplash.com/photo-1558961317-194342a086cd?auto=format&fit=crop&w=500&q=80',
    price: 1.80,
    category: 'Biscuits',
    description: 'Classic crunchy biscuits loaded with real milk chocolate chips.',
  }
];

const seedData = async () => {
  try {
    // Clear out any existing products to prevent duplicates
    await Product.deleteMany();
    console.log('Old products cleared from database.');

    // Insert the clean sample product list
    await Product.insertMany(sampleProducts);
    console.log('Sample products successfully seeded into MongoDB!');
    
    process.exit(0); // Exit the script cleanly
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();