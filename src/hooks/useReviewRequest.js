import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';


const useReviewRequest = () => {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const location  = useLocation();
  const type      = location.state?.type || 'owner';

  const [request, setRequest]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        let data;

        if (type === 'car') {
          const response = await axiosInstance.get(`/cars/${id}`);
          data = response.data;
          setRequest({
            id:   data.id,
            type: 'Car',
            user: {
              name:  data.owner_name  || data.owner?.name  || '—',
              email: data.owner_email || data.owner?.email || '—',
              phone: data.owner_phone || data.owner?.phone || '—',
            },
            details: {
              description:          data.description || '—',
              submittedOn:          data.created_at
                ? new Date(data.created_at).toLocaleString('en-US')
                : '—',
              drivingLicenseNumber: data.driving_license_number || '—',
              idNumber:             data.id_number || '—',
            },
            documents: {
              id:      data.id_images      ? [data.id_images]      : [],
              license: data.license_images ? [data.license_images] : [],
              selfie:  data.selfie_images  ? [data.selfie_images]  : [],
            },
          });

        } else {
          // Partner/Owner request
          const response = await axiosInstance.get(`/partner/status`);
          data = response.data;

          setRequest({
            id:   data.id || id,
            type: 'Owner',
            user: {
              name:  data.full_name || '—',
              email: data.email     || '—',
              phone: data.contact   || '—',
            },
            details: {
              description:          data.description || '—',
              submittedOn:          data.created_at
                ? new Date(data.created_at).toLocaleString('en-US')
                : '—',
              drivingLicenseNumber: data.driving_license_number || '—',
              idNumber:             data.id_number || '—',
            },
            documents: {
              id:      data.id_image      ? [data.id_image]      : [],
              license: data.license_image ? [data.license_image] : [],
              selfie:  data.selfie_image  ? [data.selfie_image]  : [],
            },
          });
        }

      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Failed to load request details.';
        setServerError(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRequest();
  }, [id, type]);

  // ─── Accept ───────────────────────────────────────────
  const handleAccept = async () => {
    setServerError('');
    try {
      setActionLoading(true);
      await axiosInstance.post(`/bookings/${id}/approve`);
      navigate(-1); // يرجع لصفحة الـ requests
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to accept request.';
      setServerError(message);
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Reject ───────────────────────────────────────────
  const handleReject = async () => {
    setServerError('');
    try {
      setActionLoading(true);
      await axiosInstance.post(`/bookings/${id}/reject`);
      navigate(-1);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to reject request.';
      setServerError(message);
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Back ─────────────────────────────────────────────
  const handleBack = () => navigate(-1);

  return {
    request,
    loading,
    actionLoading,
    serverError,
    handleAccept,
    handleReject,
    handleBack,
  };
};

export default useReviewRequest;