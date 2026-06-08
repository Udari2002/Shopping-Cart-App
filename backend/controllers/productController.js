import Product from '../models/Product.js';

// @desc    Fetch all products from database
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch products' });
  }
};

export { getProducts };