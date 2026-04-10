import React from 'react';
import useForgotPassword from '../hooks/Useforgotpassword';
import './forgotPassword.css';
import logoIcon from '../assets/icons/car-logo (1).svg';

const ForgotPassword = () => {
  const {
    email,
    loading,
    serverError,
    success,
    handleChange,
    handleSubmit,
  } = useForgotPassword();

  return (
    <div className="forgot-page">
      <div className="forgot-navbar">
        <div className="forgot-logo">
          <img src={logoIcon} alt="Rently" className="forgot-logo-img" />
          <span className="forgot-logo-text">Rently</span>
        </div>
      </div>

      <div className="forgot-body">
        <div className="forgot-card">
          <h1 className="forgot-title">Enter your Email</h1>
          <p className="forgot-subtitle">
            we will send you a verification code on that email
          </p>

          {serverError && (
            <div className="forgot-error-banner">{serverError}</div>
          )}

          {success && (
            <div className="forgot-success-banner">
              Verification code sent! Check your email.
            </div>
          )}

          <form className="forgot-form" onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="forgot-input"
            />

            <button
              type="submit"
              className="forgot-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send verification code'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;