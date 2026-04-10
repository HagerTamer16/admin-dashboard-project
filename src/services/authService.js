import axiosInstance from '../services/axiosInstance';

// ─── Login ───────────────────────────────────────────────
export const loginService = async ({ identifier, password }) => {
  const response = await axiosInstance.post('/auth/login', {
    identifier,
    password,
  });
  return response.data;
  // response.data => { access_token, user: { id, ... } }
};

// ─── Forgot Password ─────────────────────────────────────
export const forgotPasswordService = async (email) => {
  const response = await axiosInstance.post('/auth/forgot-password', { email });
  return response.data;
};

// ─── Verify Reset Code (OTP) ─────────────────────────────
export const verifyResetCodeService = async ({ email, otp }) => {
  const response = await axiosInstance.post('/auth/verify-reset-code', { email, otp });
  return response.data;
};

// ─── Reset New Password ──────────────────────────────────────
export const resetPasswordService = async ({ email, otp, new_password }) => {
  const response = await axiosInstance.post('/auth/reset-password', {
    email,
    otp,
    new_password,
  });
  return response.data;
};

// ─── Change Password (In-App) ────────────────────────────
export const changePasswordService = async ({ current_password, new_password }) => {
  const response = await axiosInstance.post('/auth/change-password', {
    current_password,
    new_password,
  });
  return response.data;
};

// ─── Register ────────────────────────────────────────────
export const registerService = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
  // userData => { first_name, last_name, email, phone, password, role, nationality, agreed_to_terms, agreed_to_privacy }
};

// ─── Verify OTP (after Register) ─────────────────────────
export const verifyOtpService = async ({ user_id, otp }) => {
  const response = await axiosInstance.post('/auth/verify-otp', { user_id, otp });
  return response.data;
};

// ─── Resend OTP ───────────────────────────────────────────
export const resendOtpService = async (user_id) => {
  const response = await axiosInstance.post('/auth/resend-otp', { user_id });
  return response.data;
};