// client/src/admin/adminApi.js
// All API calls for the admin dashboard, using the admin JWT token.

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const adminApi = axios.create({ baseURL: API_BASE });

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('dhk_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const adminLogin = (data) => adminApi.post('/admin/auth/login', data).then(r => r.data);
export const adminGetProfile = () => adminApi.get('/admin/auth/profile').then(r => r.data);

// Appointments
export const adminGetAppointments = (params) => adminApi.get('/appointments/admin/all', { params }).then(r => r.data);
export const adminCancelAppointment = (id, reason) => adminApi.patch(`/appointments/admin/${id}/cancel`, { reason }).then(r => r.data);
export const adminUpdateStatus = (id, status) => adminApi.patch(`/appointments/admin/${id}/status`, { status }).then(r => r.data);

// Hospitals
export const adminGetHospitals = () => adminApi.get('/hospitals').then(r => r.data);
export const adminCreateHospital = (data) => adminApi.post('/hospitals', data).then(r => r.data);
export const adminUpdateHospital = (id, data) => adminApi.put(`/hospitals/${id}`, data).then(r => r.data);
export const adminDeleteHospital = (id) => adminApi.delete(`/hospitals/${id}`).then(r => r.data);

// Doctors
export const adminGetDoctors = (hospitalId) => adminApi.get('/doctors', { params: hospitalId ? { hospitalId } : {} }).then(r => r.data);
export const adminCreateDoctor = (data) => adminApi.post('/doctors', data).then(r => r.data);
export const adminUpdateDoctor = (id, data) => adminApi.put(`/doctors/${id}`, data).then(r => r.data);
export const adminDeleteDoctor = (id) => adminApi.delete(`/doctors/${id}`).then(r => r.data);

// Image upload
export const adminUploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return adminApi.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data);
};

export default adminApi;
