import axiosInstance from '../services/axiosInstance';

// ─── List Cars (with filters) ─────────────────────────────
export const listCarsService = async (filters = {}) => {
  // filters => { page, per_page, brand, model, min_year, max_year,
  //              min_price, max_price, color, transmission,
  //              location, available_from, available_to }
  const response = await axiosInstance.get('/cars', { params: filters });
  return response.data;
};

// ─── Get Car Details ──────────────────────────────────────
export const getCarDetailsService = async (carId) => {
  const response = await axiosInstance.get(`/cars/${carId}`);
  return response.data;
};

// ─── My Cars (Owner) ──────────────────────────────────────
export const getMyCarsService = async ({ page = 1, per_page = 10 } = {}) => {
  const response = await axiosInstance.get('/cars/my-cars', {
    params: { page, per_page },
  });
  return response.data;
};

// ─── Add Car (Owner) ──────────────────────────────────────
// بيبعت FormData عشان فيه صور
export const addCarService = async (formData) => {
  const response = await axiosInstance.post('/cars', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// ─── Update Car (Owner) ───────────────────────────────────
export const updateCarService = async (carId, formData) => {
  const response = await axiosInstance.put(`/cars/${carId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// ─── Delete Car (Owner) ───────────────────────────────────
export const deleteCarService = async (carId) => {
  const response = await axiosInstance.delete(`/cars/${carId}`);
  return response.data;
};

// ─── Check Car Availability ───────────────────────────────
export const checkCarAvailabilityService = async (carId, { start_date, end_date }) => {
  const response = await axiosInstance.get(`/cars/${carId}/availability`, {
    params: { start_date, end_date },
  });
  return response.data;
};