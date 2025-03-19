import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with tailwind-merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes File size in bytes
 * @returns Formatted string (e.g., "4.2 MB")
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param str The string to truncate
 * @param length Maximum length before truncation
 * @returns Truncated string
 */
export function truncateString(str, length) {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.slice(0, length) + '...';
}

/**
 * Get file icon based on file type/mime type
 * @param fileType The MIME type of the file
 * @returns Material icon name for the file type
 */
export function getFileIcon(fileType) {
  if (!fileType) return 'description';
  
  if (fileType.includes('image')) {
    return 'image';
  } else if (fileType.includes('pdf')) {
    return 'picture_as_pdf';
  } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
    return 'insert_chart';
  } else if (fileType.includes('word') || fileType.includes('document')) {
    return 'description';
  } else if (fileType.includes('zip') || fileType.includes('compressed')) {
    return 'folder_zip';
  } else if (fileType.includes('audio')) {
    return 'audio_file';
  } else if (fileType.includes('video')) {
    return 'video_file';
  } else if (fileType.includes('text')) {
    return 'text_snippet';
  }
  
  return 'description';
}

/**
 * Generate a color for a username (for consistent avatar colors)
 * @param username The username to generate a color for
 * @returns Tailwind CSS color class
 */
export function getUserColor(username) {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];
  
  // Simple hash function to get consistent color for a username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash % colors.length);
  return colors[index];
}