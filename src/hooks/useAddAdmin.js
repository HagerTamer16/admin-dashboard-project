import { useState } from 'react';
import { addAdminService, requestAddAdminOtpService } from '../services/adminService';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  otp: '',
  otpSent: false,
};

const validate = (formData) => {
  const errors = {};

  if (!formData.name)
    errors.name = 'Name is required.';

  if (!formData.phone)
    errors.phone = 'Phone number is required.';

  if (!formData.email)
    errors.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = 'Invalid email address.';

  if (!formData.otp)
    errors.otp = 'Verification code is required.';
  else if (formData.otp.length !== 6)
    errors.otp = 'Code must be 6 digits.';

  if (!formData.password)
    errors.password = 'Password is required.';
  else if (formData.password.length < 6)
    errors.password = 'Password must be at least 6 characters.';

  if (!formData.confirmPassword)
    errors.confirmPassword = 'Please confirm your password.';
  else if (formData.password !== formData.confirmPassword)
    errors.confirmPassword = 'Passwords do not match.';

  return errors;
};

const useAddAdmin = () => {
  const [formData, setFormData]       = useState(initialForm);
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [otpLoading, setOtpLoading]   = useState(false);
  const [success, setSuccess]         = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const handleRequestOtp = async () => {
    setServerError('');

    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required to send the code.' }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address.' }));
      return;
    }

    try {
      setOtpLoading(true);
      await requestAddAdminOtpService(formData.email);
      setFormData((prev) => ({ ...prev, otpSent: true }));
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to send verification code.';
      setServerError(message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const nameParts  = formData.name.trim().split(' ');
    const first_name = nameParts[0];
    const last_name  = nameParts.slice(1).join(' ') || nameParts[0];

    try {
      setLoading(true);
      await addAdminService({
        first_name,
        last_name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        otp: formData.otp,
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
    otpLoading,
    success,
    serverError,
    handleChange,
    handleRequestOtp,
    handleSubmit,
  };
};

export default useAddAdmin;