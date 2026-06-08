import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // We will use a direct image URL string here
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    category: {
      type: String,
      required: true, // e.g., 'Vegetables', 'Fruits', 'Cakes', 'Biscuits'
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;