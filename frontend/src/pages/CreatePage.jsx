import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreatePage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveProduct = () => {
    if (!name || !price || !image) {
      enqueueSnackbar('Please fill in all fields.', { variant: 'warning' });
      return;
    }

    const data = { name, price, image };
    
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, data)
      .then(() => {
        console.log(data);
        setLoading(false);
        enqueueSnackbar('Product Created successfully', { variant: 'success' });
        setName('');
        setPrice('');
        setImage('');
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error creating product', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className="text-4xl font-bold my-4 text-center text-sky-600">Create Product</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-600 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Product Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Product Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Product Image</label>
          <input
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        
        <button className='p-2 bg-sky-600 m-8' onClick={handleSaveProduct}>
          Save Product
        </button>
      </div>
    </div>
  );
}

export default CreatePage;
