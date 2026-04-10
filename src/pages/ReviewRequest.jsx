import React from "react";
import useReviewRequest from '../hooks/useReviewRequest';
import "./ReviewRequest.css";
import photoPlaceholder from "../assets/icons/photo.png";

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const PhotoCard = ({ src }) => (
  <div className="photo-card">
    <img src={src || photoPlaceholder} className="photo-img" />
  </div>
);

const ReviewRequest = () => {
  const {
    request,
    loading,
    actionLoading,
    handleAccept,
    handleReject,
    handleBack,
  } = useReviewRequest();

  if (loading) return <div className="review-loading">Loading...</div>;
  if (!request) return <div className="review-loading">Request not found</div>;

  return (
    <div className="review-container">
      <div className="review-header">
        <button className="back-btn" onClick={handleBack}>
          <BackIcon />
        </button>

        <h1 className="review-title">
          Review Request #{request.id} “{request.type}”
        </h1>
      </div>

     
      <div className="review-body">
        <div className="review-left">
          <div className="review-section">
            <h2 className="section-title">User Information</h2>

            <div className="info-row">
              <span className="info-label">• Name</span>
              <span className="info-value">{request.user?.name}</span>
            </div>

            <div className="info-row">
              <span className="info-label">• Email</span>
              <span className="info-value">{request.user?.email}</span>
            </div>

            <div className="info-row">
              <span className="info-label">• phone Number</span>
              <span className="info-value">{request.user?.phone}</span>
            </div>
          </div>
          <div className="review-section">
            <h2 className="section-title">Request Details</h2>

            <p className="request-description">
              {request.details?.description}
              <br />
              submitted on : {request.details?.submittedOn}
            </p>

            <div className="info-row">
              <span className="info-label">• Driving License Number</span>
              <span className="info-value">
                {request.details?.drivingLicenseNumber}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">• ID Number</span>
              <span className="info-value">
                {request.details?.idNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="review-right">

          <h2 className="section-title">Submitted Documents</h2>

          <div className="doc-group">
            <h3 className="doc-label">ID</h3>
            <div className="doc-photos">
              {(request.documents?.id || []).map((src, i) => (
                <PhotoCard key={i} src={src} />
              ))}
            </div>
          </div>

          <div className="doc-group">
            <h3 className="doc-label">License</h3>
            <div className="doc-photos">
              {(request.documents?.license || []).map((src, i) => (
                <PhotoCard key={i} src={src} />
              ))}
            </div>
          </div>

          <div className="doc-group">
            <h3 className="doc-label">Selfie</h3>
            <div className="doc-photos">
              {(request.documents?.selfie || []).map((src, i) => (
                <PhotoCard key={i} src={src} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="review-actions">
        <button
          className="reject-btn"
          onClick={handleReject}
          disabled={actionLoading}
        >
          Reject
        </button>

        <button
          className="accept-btn"
          onClick={handleAccept}
          disabled={actionLoading}
        >
          Accept
        </button>
      </div>

    </div>
  );
};

export default ReviewRequest;