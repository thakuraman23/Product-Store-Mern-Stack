import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const EditPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        if (response.data) {
          setName(response.data.name || '');
          setPrice(response.data.price || '');
          setImage(response.data.image || '');
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching product:', error);
        enqueueSnackbar('Error fetching product data', { variant: 'error' });
        navigate('/');
      });
  }, [id, navigate, enqueueSnackbar]);

  const handleEditProduct = () => {
    if (!name || !price || !image) {
      enqueueSnackbar('All fields are required', { variant: 'warning' });
      return;
    }

    const data = { name, price, image };
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/products/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product updated successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error updating product:', error);
        enqueueSnackbar('Error updating product', { variant: 'error' });
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold my-4 text-center text-sky-600">Edit Product</h1>
      {loading && <Spinner />}
      
      <div className="flex flex-col border-2 border-sky-600 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Product Name</label>
          <input
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Product Price</label>
          <input
            type="number"
            defaultValue={price} 
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Product Image URL</label>
          <input
            type="text"
            defaultValue={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        {image && <img src={image} alt="Product Preview" className="w-full h-40 object-cover rounded-md mb-4" />}

        <button 
          className="p-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
          onClick={handleEditProduct}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPage;
