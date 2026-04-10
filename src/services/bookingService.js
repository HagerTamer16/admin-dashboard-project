import axiosInstance from '../services/axiosInstance';

// ─── Get All Bookings (with filters) ─────────────────────
export const getBookingsService = async ({ page = 1, per_page = 10, status, search } = {}) => {
  const response = await axiosInstance.get('/bookings', {
    params: {
      page,
      per_page,
      ...(status && status !== 'All' && { status: status.toLowerCase() }),
      ...(search && { search }),
    },
  });
  return response.data;
};

// ─── List My Bookings ─────────────────────────────────────
export const listMyBookingsService = async ({ page = 1, per_page = 10, status } = {}) => {
  const response = await axiosInstance.get('/bookings', {
    params: { page, per_page, ...(status && { status }) },
  });
  return response.data;
};

// ─── Create Booking ───────────────────────────────────────
export const createBookingService = async (bookingData) => {
  // bookingData => { car_id, start_date, end_date, rental_type,
  //                  contact_name, contact_email, contact_phone,
  //                  pickup_location, service_fee }
  const response = await axiosInstance.post('/bookings', bookingData);
  return response.data;
};

// ─── Get Booking Details ──────────────────────────────────
export const getBookingDetailsService = async (bookingId) => {
  const response = await axiosInstance.get(`/bookings/${bookingId}`);
  return response.data;
};

// ─── Get Bookings Calendar ────────────────────────────────
export const getBookingsCalendarService = async () => {
  const response = await axiosInstance.get('/bookings/calendar');
  return response.data;
};

// ─── Approve Booking (Owner) ──────────────────────────────
export const approveBookingService = async (bookingId) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/approve`);
  return response.data;
};

// ─── Reject Booking (Owner) ───────────────────────────────
export const rejectBookingService = async (bookingId) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/reject`);
  return response.data;
};

// ─── Cancel Booking (Renter) ──────────────────────────────
export const cancelBookingService = async (bookingId) => {
  const response = await axiosInstance.post(`/bookings/${bookingId}/cancel`);
  return response.data;
};