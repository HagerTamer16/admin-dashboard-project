import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../services/authService';

const initialForm = {
  identifier: '', // email أو phone
  password: '',
};

const validate = (formData) => {
  const errors = {};

  if (!formData.identifier)
    errors.identifier = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(formData.identifier))
    errors.identifier = 'Invalid email address.';

  if (!formData.password)
    errors.password = 'Password is required.';

  return errors;
};

const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');   // server error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const data = await loginService(formData);

      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

    
      navigate('/dashboard');
    } catch (err) { 
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid credentials. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;