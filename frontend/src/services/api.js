import axios from 'axios';

// Get API URL from environment or use default
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085/api/v1/tickets';

const api = {
    getAll: (params) => axios.get(API_URL, { params }),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    create: (data) => axios.post(API_URL, data),
    update: (id, data) => axios.put(`${API_URL}/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/${id}`),
    search: (query, params) => axios.get(API_URL, { params: { ...params, search: query } })
};

export default api;
