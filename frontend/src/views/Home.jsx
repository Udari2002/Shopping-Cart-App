import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available database category filter channels matching SRS specifications
  const categories = ['All', 'Vegetables', 'Fruits', 'Cakes', 'Biscuits'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Request the seeded array directly from our functional server port 5000 API
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch catalog records');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products locally whenever the selected category changes
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 flex-col space-y-3">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        <p className="text-gray-500 font-medium text-sm">Loading market catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center font-medium">
        ⚠️ Error: {error}. Please ensure your backend server is actively running on port 5000.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Dynamic Marketplace Hero Header Banner Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-xl relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
            Fresh Grocery Marketplace
          </h1>
          <p className="text-green-50 text-sm sm:text-base font-medium opacity-90 leading-relaxed">
            Discover fresh organic farm vegetables, hand-picked fruits, premium cakes, and crisp bakery biscuits instantly delivered to your doorstep.
          </p>
        </div>
        <span className="absolute right-8 bottom-0 text-9xl opacity-10 select-none hidden md:block">🛒</span>
      </div>

      {/* Pill-Shaped Dynamic Category Filter Bar Panel */}
      <div className="flex flex-wrap gap-2 mb-8 items-center border-b border-gray-100 pb-4">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mr-2">Filter By:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all tracking-wide ${
              selectedCategory === cat
                ? 'bg-green-600 text-white shadow-md shadow-green-100'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Structural Catalog Grid Mapping */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-400 font-medium text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
