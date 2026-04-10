import React from 'react';
import useAddAdmin from '../hooks/useAddAdmin';
import './AddAdmin.css';

const AddAdmin = () => {
  const {
    formData,
    errors,
    loading,
    success,
    serverError,
    handleChange,
    handleSubmit,
  } = useAddAdmin();

  return (
    <div className="add-admin-container">
      <div className="add-admin-card">
        <h1 className="add-admin-title">Create New Admin</h1>
        <p className="add-admin-subtitle">Please Enter The Following Details</p>

        {success && (
          <div className="success-banner">Admin created successfully!</div>
        )}
        {serverError && (
          <div className="error-banner">{serverError}</div>
        )}

        <form className="add-admin-form" onSubmit={handleSubmit} noValidate>

          <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </div>

          <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </div>
          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
            />
            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
          </div>
          <p className="verification-notice">
            we will send you a verification code on your email
          </p>

          <button type="submit" className="create-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Admin'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddAdmin;