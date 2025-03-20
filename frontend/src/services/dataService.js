import { API_BASE_URL, API_CONFIG } from '../config/api';

// Upload Data function
export const uploadData = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/records/upload`, {
    method: 'POST',
    ...API_CONFIG,
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return await response.json();
};

// Export Report function
export const exportReport = async () => {
  const response = await fetch(`${API_BASE_URL}/api/records/export`, {
    method: 'GET',
    ...API_CONFIG,
  });

  if (!response.ok) {
    throw new Error('Failed to export data');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ddas-report-${new Date().toISOString().split('T')[0]}.xlsx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// Review Duplicates function
export const getDuplicates = async () => {
  const response = await fetch(`${API_BASE_URL}/api/records/duplicates`, {
    method: 'GET',
    ...API_CONFIG,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch duplicates');
  }

  return await response.json();
};

// Manage Data function
export const getAllRecords = async () => {
  const response = await fetch(`${API_BASE_URL}/api/records`, {
    method: 'GET',
    ...API_CONFIG,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch records');
  }

  return await response.json();
}; 