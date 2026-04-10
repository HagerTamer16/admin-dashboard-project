import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const initialForm = {
  newPassword: '',
  confirmPassword: '',
};

const initialShow = {
  new: false,
  confirm: false,
};

const validate = (formData) => {
  const errors = {};

  if (!formData.newPassword)
    errors.newPassword = 'New password is required.';
  else if (formData.newPassword.length < 6)
    errors.newPassword = 'Password must be at least 6 characters.';

  if (!formData.confirmPassword)
    errors.confirmPassword = 'Please confirm your password.';
  else if (formData.newPassword !== formData.confirmPassword)
    errors.confirmPassword = 'Passwords do not match.';

  return errors;
};

const useNewPassword = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { email, otp } = location.state || {};

  const [formData, setFormData]       = useState(initialForm);
  const [showPassword, setShowPassword] = useState(initialShow);
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!email || !otp) {
      setServerError('Session expired. Please start over.');
      setTimeout(() => navigate('/forgot-password'), 2000);
      return;
    }

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/auth/reset-password', {
        email,
        otp,
        new_password: formData.newPassword,
      });

      navigate('/login');
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
    formData,
    showPassword,
    errors,
    loading,
    serverError,
    handleChange,
    toggleShow,
    handleSubmit,
  };
};

export default useNewPassword;