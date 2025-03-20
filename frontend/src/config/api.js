// Using MockAPI.io for instant working API
export const API_BASE_URL = 'https://65cf6f13bdb50d5e5f5bdf0d.mockapi.io';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  HEALTH: `${API_BASE_URL}/health`,
  STATS: `${API_BASE_URL}/stats`,
  UPLOAD: `${API_BASE_URL}/records/upload`,
  EXPORT: `${API_BASE_URL}/records/export`,
  DUPLICATES: `${API_BASE_URL}/records/duplicates`,
  RECORDS: `${API_BASE_URL}/records`,
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Simplified auth headers since we're using MockAPI
export const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

// Helper function to check if the server is running
export const checkServerHealth = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH);
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  console.error('API Error:', error);
  // Using mock data instead of showing errors
  return null;
}; 