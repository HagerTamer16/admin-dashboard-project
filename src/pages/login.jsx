import React from 'react';
import useLogin from '../hooks/useLogin';
import './login.css';
import logoIcon from '../assets/icons/car-logo (1).svg';
import carImage from '../assets/icons/background.png';

const Login = () => {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-navbar">
          <div className="login-logo">
            <img src={logoIcon} alt="Rently" className="login-logo-img" />
            <span className="login-logo-text">Rently</span>
          </div>
          <a href="/login" className="login-nav-link">Login</a>
        </div>

        <div className="login-body"> 
          <div className="login-form-side">
            <h1 className="login-title">Login As Admin</h1>

            {error && (
              <div className="login-error-banner">{error}</div>
            )}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <input
                  type="email"
                  name="identifier" 
                  placeholder="Email"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="login-input"
                />
              </div>
              <div className="input-group password-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="login-input"
                />
              </div>
              <div className="login-extras">
                <label className="remember-me-container">
                  <input type="checkbox" className="remember-checkbox" />
                  <span className="remember-text">Remember me</span>
                </label>
                <a href="/forgot-password" name="forgot-password" className="forgot-password-link">
                  Forgot Password ?
                </a>
              </div>
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
          <div className="login-image-side">
            <img src={carImage} alt="Car" className="login-car-img" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;