import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const RESEND_COUNTDOWN = 60; 

const useVerifyOtp = (emailProp) => {
  const navigate  = useNavigate();
  const location  = useLocation();


  const { email: stateEmail, user_id, flow } = location.state || {};
  const email = emailProp || stateEmail || '';

  const [otp, setOtp]               = useState(Array(6).fill(''));
  const [loading, setLoading]       = useState(false);
  const [serverError, setServerError] = useState('');
  const [countdown, setCountdown]   = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend]   = useState(false);
  const inputsRef                   = useRef([]);
  const timerRef                    = useRef(null);

  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerRef.current);
  }, []);

  const startCountdown = () => {
    setCanResend(false);
    setCountdown(RESEND_COUNTDOWN);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
 // ─── تغيير قيمة الـ input ─────────────────────────────
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (serverError) setServerError('');
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ─── التعامل مع الـ Backspace ─────────────────────────
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ─── Paste ────────────────────────────────────────────
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newOtp = Array(6).fill('');
    pasted.split('').forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  // ─── Submit ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const otpString = otp.join('');
    if (otpString.length < 6) {
      setServerError('Please enter the complete 6-digit code.');
      return;
    }

    try {
      setLoading(true);

      if (flow === 'forgot-password') {
        // verify reset code ثم روح لصفحة new password
        await axiosInstance.post('/auth/verify-reset-code', { email, otp: otpString });
        navigate('/new-password', { state: { email, otp: otpString } });
      } else {
        // register flow — verify OTP ثم روح لصفحة login
        await axiosInstance.post('/auth/verify-otp', { user_id, otp: otpString });
        navigate('/login');
      }

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid OTP. Please try again.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Resend OTP ───────────────────────────────────────
  const handleResend = async () => {
    if (!canResend) return;
    setServerError('');

    try {
      if (flow === 'forgot-password') {
        await axiosInstance.post('/auth/forgot-password', { email });
      } else {
        await axiosInstance.post('/auth/resend-otp', { user_id });
      }
      setOtp(Array(6).fill(''));
      inputsRef.current[0]?.focus();
      startCountdown();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to resend OTP. Please try again.';
      setServerError(message);
    }
  };

  return {
    otp,
    loading,
    serverError,
    countdown,
    canResend,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResend,
  };
};

export default useVerifyOtp;