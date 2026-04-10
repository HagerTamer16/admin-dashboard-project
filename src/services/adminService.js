import axiosInstance from '../services/axiosInstance';

//      علي ايميل الادمن الجديد otp  طلب إرسال
export const requestAddAdminOtpService = async (email) => {
  const response = await axiosInstance.post('/admins/request-otp', { email });
  return response.data;
};

// otp إضافة الأدمن الجديد مع الـ 
export const addAdminService = async (adminData) => {
  const response = await axiosInstance.post('/admins', adminData);
  return response.data;
};