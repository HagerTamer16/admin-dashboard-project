import { useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const initialForm = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validate = (formData) => {
  const errors = {};

  if (!formData.oldPassword)
    errors.oldPassword = 'Old password is required.';

  if (!formData.newPassword)
    errors.newPassword = 'New password is required.';
  else if (formData.newPassword.length < 6)
    errors.newPassword = 'Password must be at least 6 characters.';
  else if (formData.newPassword === formData.oldPassword)
    errors.newPassword = 'New password must be different from old password.';

  if (!formData.confirmPassword)
    errors.confirmPassword = 'Please confirm your new password.';
  else if (formData.newPassword !== formData.confirmPassword)
    errors.confirmPassword = 'Passwords do not match.';

  return errors;
};

const useResetPassword = () => {
  const [formData, setFormData]       = useState(initialForm);
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/auth/change-password', {
        current_password: formData.oldPassword,
        new_password: formData.newPassword,
      });

      setSuccess(true);
      setFormData(initialForm);
      setTimeout(() => setSuccess(false), 3000);
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
    errors,
    loading,
    success,
    serverError,
    handleChange,
    handleSubmit,
  };
};

export default useResetPassword;