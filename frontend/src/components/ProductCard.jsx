import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
      
      {/* Product Image Section with absolute badge pinning safety layers */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden group flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // If an Unsplash image fails to load or drops connection, replace it with a clean CSS gradient fallback box
              e.target.style.display = 'none';
              e.target.parentNode.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200');
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        
        {/* Isolated z-indexed category badge layout capsule */}
        <span className="absolute top-3 left-3 z-10 bg-green-100 text-green-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Product Details Content Section - pt-6 adds a clean buffer zone under the image panel boundaries */}
      <div className="p-4 pt-5 flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-gray-800 line-clamp-1 block tracking-tight">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed min-h-[2rem]">
            {product.description}
          </p>
        </div>

        {/* Price and Action Control Footers */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <span className="text-lg font-black text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center space-x-1 text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition-colors shadow-sm active:scale-95 transform"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;