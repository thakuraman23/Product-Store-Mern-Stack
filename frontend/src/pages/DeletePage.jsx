import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeletePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteProduct = () => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting product', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold my-4 text-center text-sky-600'>Delete Product</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this product?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteProduct}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeletePage;
