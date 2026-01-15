// API configuration for frontend
// In production, this will use relative paths since frontend and backend are on the same domain
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export default API_BASE_URL;
