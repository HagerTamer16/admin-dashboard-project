import axiosInstance from '../services/axiosInstance';

// ══════════════════════════════════════════════
//  FAVORITES
// ══════════════════════════════════════════════

export const getMyFavoritesService = async ({ page = 1, per_page = 10 } = {}) => {
  const response = await axiosInstance.get('/favorites', { params: { page, per_page } });
  return response.data;
};

export const addToFavoritesService = async (carId) => {
  const response = await axiosInstance.post(`/favorites/${carId}`);
  return response.data;
};

export const removeFromFavoritesService = async (carId) => {
  const response = await axiosInstance.delete(`/favorites/${carId}`);
  return response.data;
};


// ══════════════════════════════════════════════
//  REVIEWS
// ══════════════════════════════════════════════

export const addReviewService = async ({ car_id, rating, comment }) => {
  const response = await axiosInstance.post('/reviews', { car_id, rating, comment });
  return response.data;
};

export const listReviewsService = async ({ car_id, page = 1, per_page = 10, renter_id } = {}) => {
  const response = await axiosInstance.get('/reviews', {
    params: { car_id, page, per_page, ...(renter_id && { renter_id }) },
  });
  return response.data;
};

export const deleteReviewService = async (reviewId) => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}`);
  return response.data;
};


// ══════════════════════════════════════════════
//  MESSAGES / CHAT
// ══════════════════════════════════════════════

export const sendMessageService = async ({ receiver_id, content }) => {
  const response = await axiosInstance.post('/messages', { receiver_id, content });
  return response.data;
};

export const getConversationService = async (userId, { page = 1, per_page = 50 } = {}) => {
  const response = await axiosInstance.get(`/messages/${userId}`, {
    params: { page, per_page },
  });
  return response.data;
};

export const getInboxService = async () => {
  const response = await axiosInstance.get('/messages/inbox');
  return response.data;
};


// ══════════════════════════════════════════════
//  NOTIFICATIONS
// ══════════════════════════════════════════════

export const getNotificationsService = async ({ page = 1, per_page = 20 } = {}) => {
  const response = await axiosInstance.get('/notifications', {
    params: { page, per_page },
  });
  return response.data;
};

export const getUnreadCountService = async () => {
  const response = await axiosInstance.get('/notifications/unread-count');
  return response.data;
};

export const markAllAsReadService = async () => {
  const response = await axiosInstance.post('/notifications/mark-read');
  return response.data;
};

export const markSingleAsReadService = async (notificationId) => {
  const response = await axiosInstance.post(`/notifications/${notificationId}/read`);
  return response.data;
};


// ══════════════════════════════════════════════
//  SEARCH HISTORY
// ══════════════════════════════════════════════

export const getSearchHistoryService = async () => {
  const response = await axiosInstance.get('/search/history');
  return response.data;
};

export const saveSearchService = async (query) => {
  const response = await axiosInstance.post('/search/history', { query });
  return response.data;
};

export const clearAllSearchHistoryService = async () => {
  const response = await axiosInstance.delete('/search/history');
  return response.data;
};

export const deleteSingleSearchService = async (entryId) => {
  const response = await axiosInstance.delete(`/search/history/${entryId}`);
  return response.data;
};


// ══════════════════════════════════════════════
//  PARTNER PROGRAM
// ══════════════════════════════════════════════

export const applyAsPartnerService = async (partnerData) => {
  // partnerData => { full_name, email, contact, driving_license_number,
  //                  car_brand, car_model, photo (File) }
  const formData = new FormData();
  Object.entries(partnerData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });
  const response = await axiosInstance.post('/partner/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const checkPartnerStatusService = async () => {
  const response = await axiosInstance.get('/partner/status');
  return response.data;
};