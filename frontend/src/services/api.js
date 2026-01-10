import axios from 'axios';

// Get API URL from environment variable
// For production, set VITE_API_URL in your .env file
const API_URL = import.meta.env.VITE_API_URL || (() => {
    console.warn(
        '⚠️ VITE_API_URL not set! Using default: http://localhost:3000\n' +
        '   For production, set VITE_API_URL in your .env file'
    );
    return 'http://localhost:3000';
})();

// Create axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    signup: async (data) => {
        const response = await apiClient.post('/auth/signup', data);
        return response.data;
    },
    login: async (data) => {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },
    getMe: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};

// Content Ideas API
export const contentIdeasAPI = {
    create: async (data) => {
        const response = await apiClient.post('/content-ideas', data);
        return response.data;
    },
    getAll: async (platform) => {
        const response = await apiClient.get('/content-ideas', {
            params: platform ? { platform } : {},
        });
        return response.data;
    },
    getOne: async (id) => {
        const response = await apiClient.get(`/content-ideas/${id}`);
        return response.data;
    },
    update: async (id, data) => {
        const response = await apiClient.patch(`/content-ideas/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/content-ideas/${id}`);
        return response.data;
    },
};

// Captions API
export const captionsAPI = {
    create: async (data) => {
        const response = await apiClient.post('/captions', data);
        return response.data;
    },
    getAll: async (filters = {}) => {
        const response = await apiClient.get('/captions', { params: filters });
        return response.data;
    },
    getOne: async (id) => {
        const response = await apiClient.get(`/captions/${id}`);
        return response.data;
    },
    update: async (id, data) => {
        const response = await apiClient.patch(`/captions/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/captions/${id}`);
        return response.data;
    },
};

// Posts API
export const postsAPI = {
    create: async (data) => {
        const response = await apiClient.post('/posts', data);
        return response.data;
    },
    getAll: async (filters = {}) => {
        const response = await apiClient.get('/posts', { params: filters });
        return response.data;
    },
    getOne: async (id) => {
        const response = await apiClient.get(`/posts/${id}`);
        return response.data;
    },
    update: async (id, data) => {
        const response = await apiClient.patch(`/posts/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/posts/${id}`);
        return response.data;
    },
    getCalendar: async () => {
        const response = await apiClient.get('/posts/calendar');
        return response.data;
    },
};

// Analytics API
export const analyticsAPI = {
    create: async (postId, data) => {
        const response = await apiClient.post(`/analytics/post/${postId}`, data);
        return response.data;
    },
    getByPost: async (postId) => {
        const response = await apiClient.get(`/analytics/post/${postId}`);
        return response.data;
    },
    update: async (id, data) => {
        const response = await apiClient.patch(`/analytics/${id}`, data);
        return response.data;
    },
    getSummary: async () => {
        const response = await apiClient.get('/analytics/summary');
        return response.data;
    },
};

// Dashboard API
export const dashboardAPI = {
    getOverview: async () => {
        const response = await apiClient.get('/dashboard/overview');
        return response.data;
    },
};

export default apiClient;
