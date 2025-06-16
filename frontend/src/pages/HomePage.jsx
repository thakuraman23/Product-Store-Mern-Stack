import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 via-purple-200 to-pink-300 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12 drop-shadow-lg">Product Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-gradient-to-br from-green-200 to-blue-300 p-6 rounded-lg shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md shadow-lg mb-4"
              />
              <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-xl text-gray-700 mt-2">Price: ₹{product.price}</p>
              <div className="flex justify-between mt-6">
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                  onClick={() => navigate(`/edit/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                  onClick={() => navigate(`/delete/${product._id}`)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xl">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
