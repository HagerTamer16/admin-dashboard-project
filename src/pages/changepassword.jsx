import React from 'react';
import useResetPassword from '../hooks/useChangePassword';
import './changepassword.css';

const ResetPassword = () => {
  const {
    formData,
    errors,
    loading,
    success,
    serverError,
    handleChange,
    handleSubmit,
  } = useResetPassword();

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h1 className="reset-title">Reset Password</h1>

        {success && (
          <div className="success-banner">Password changed successfully!</div>
        )}

        {serverError && (
          <div className="error-banner">{serverError}</div>
        )}

        <form className="reset-form" onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${errors.oldPassword ? 'has-error' : ''}`}>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              className="form-input"
            />
            {errors.oldPassword && (
              <span className="error-msg">{errors.oldPassword}</span>
            )}
          </div>

          <div className={`form-group ${errors.newPassword ? 'has-error' : ''}`}>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="form-input"
            />
            {errors.newPassword && (
              <span className="error-msg">{errors.newPassword}</span>
            )}
          </div>

          <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
            />
            {errors.confirmPassword && (
              <span className="error-msg">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;