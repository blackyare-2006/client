// client/src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dhakhtarkaaga_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => api.post('/auth/register', data).then(r => r.data);
export const loginUser   = (data) => api.post('/auth/login', data).then(r => r.data);
export const getProfile  = ()     => api.get('/auth/profile').then(r => r.data);

// Appointments (patient)
export const bookAppointment    = (data) => api.post('/appointments', data).then(r => r.data);
export const getMyAppointments  = ()     => api.get('/appointments/my').then(r => r.data);
export const cancelAppointment  = (id)   => api.patch(`/appointments/${id}/cancel`).then(r => r.data);

export default api;

// Hospitals (public)
export const getHospitals = (district) =>
  api.get('/hospitals', { params: district ? { district } : {} }).then(r => r.data);
export const getHospitalById = (id) =>
  api.get(`/hospitals/${id}`).then(r => r.data);

// Doctors (public)
export const getDoctors = (specialty) =>
  api.get('/doctors', { params: specialty ? { specialty } : {} }).then(r => r.data);
export const getDoctorById = (id) =>
  api.get(`/doctors/${id}`).then(r => r.data);
export const getDoctorsByHospital = (hospitalId) =>
  api.get('/doctors', { params: { hospitalId } }).then(r => r.data);
export const getDoctorAvailability = (id, date) =>
  api.get(`/doctors/${id}/availability`, { params: { date } }).then(r => r.data);
