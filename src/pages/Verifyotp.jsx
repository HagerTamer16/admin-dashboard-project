import React from 'react';
import useVerifyOtp from '../hooks/Useverifyotp';
import logoIcon from '../assets/icons/car-logo (1).svg';
import './Verifyotp.css';

const VerifyOtp = ({ email }) => {
  const {
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
  } = useVerifyOtp(email);

  return (
    <div className="otp-page">
      <div className="otp-navbar">
        <div className="otp-logo">
          <img src={logoIcon} alt="Rently" className="otp-logo-img" />
          <span className="otp-logo-text">Rently</span>
        </div>
      </div>

      <div className="otp-card-wrapper">
        <div className="otp-card">
          <h1 className="otp-title">Enter verification code</h1>
          <p className="otp-subtitle">
            We have sent a code to: <span className="otp-email">{email || 'mo*******@gmail.com'}</span>
          </p>

          {serverError && (
            <div className="otp-error-banner">{serverError}</div>
          )}

          <form className="otp-form" onSubmit={handleSubmit} noValidate>
            <div className="otp-inputs" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`otp-input ${digit ? 'filled' : ''}`}
                />
              ))}
            </div>

            <button type="submit" className="otp-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Confirm'}
            </button>
          </form>

          <p className="otp-resend">
            Didn't receive the OTP?{' '}
            {canResend ? (
              <span className="resend-link" onClick={handleResend}>Resend</span>
            ) : (
              <span className="resend-countdown">Resend in {countdown}s</span>
            )}
          </p>
        </div>
      </div>

    </div>
  );
};

export default VerifyOtp;