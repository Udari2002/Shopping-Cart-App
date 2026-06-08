import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables from our .env file
dotenv.config();

// Connect to our MongoDB database
connectDB();

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (allows frontend to talk to backend)
app.use(cors());
// Mount our product routes at the /api/products endpoint
app.use('/api/products', productRoutes);
// Mount our authentication routes at the /api/auth endpoint
app.use('/api/auth', authRoutes);
// A simple test route to make sure our server is alive and running
app.get('/', (req, res) => {
  res.send('API is running smoothly...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT}`);
});