import axios from 'axios';

const API_URL = '/api/v1/items';

const api = {
    getAll: (params) => axios.get(API_URL, { params }),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    create: (data) => axios.post(API_URL, data),
    update: (id, data) => axios.put(`${API_URL}/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/${id}`),
    search: (query, params) => axios.get(API_URL, { params: { ...params, search: query } })
};

export default api;
