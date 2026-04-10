import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const useForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess]       = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // validation
    if (!email) {
      setServerError('Email is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setServerError('Invalid email address.');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/auth/forgot-password', { email });

      setSuccess(true);
      
      setTimeout(() => {
        navigate('/verify-otp', {
          state: { flow: 'forgot', email },
        });
      }, 2000);

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Something went wrong. Please try again.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    loading,
    serverError,
    success,
    handleChange,
    handleSubmit,
  };
};

export default useForgotPassword;