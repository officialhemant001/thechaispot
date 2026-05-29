import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchRestaurant = () => api.get('/restaurant/');
export const fetchCategories = () => api.get('/categories/');
export const fetchMenu = () => api.get('/menu/');
export const fetchItems = (params = {}) => api.get('/items/', { params });
export const fetchItemBySlug = (slug) => api.get(`/items/${slug}/`);

export default api;
