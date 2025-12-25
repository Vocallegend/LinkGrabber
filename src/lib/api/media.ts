// Media API interface for LinkGrabber
// This module defines the API structure for backend integration

import type { 
  AnalysisResult, 
  DownloadResult, 
  DownloadRequest,
  UrlValidation 
} from '@/types/media';

// API configuration - update these when backend is connected
const API_CONFIG = {
  baseUrl: '/api', // Will be updated to actual backend URL
  timeout: 30000,
  isConnected: false, // Set to true when backend is available
};

/**
 * Validate URL format and basic accessibility checks
 */
export function validateUrl(url: string): UrlValidation {
  if (!url || !url.trim()) {
    return { isValid: false, error: 'Please enter a URL' };
  }

  const trimmedUrl = url.trim();

  // Check URL format
  try {
    const urlObj = new URL(trimmedUrl);
    
    // Must be http or https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL must use HTTP or HTTPS protocol' };
    }

    // Basic domain validation
    if (!urlObj.hostname || urlObj.hostname.length < 3) {
      return { isValid: false, error: 'Invalid domain name' };
    }

  } catch {
    return { isValid: false, error: 'Invalid URL format. Please enter a complete URL starting with http:// or https://' };
  }

  return { isValid: true };
}

/**
 * Analyze media from URL
 * Returns media information including available formats
 */
export async function analyzeMedia(url: string): Promise<AnalysisResult> {
  // Validate URL first
  const validation = validateUrl(url);
  if (!validation.isValid) {
    return {
      success: false,
      error: {
        code: 'INVALID_URL',
        message: validation.error || 'Invalid URL',
      },
    };
  }

  // Check if backend is connected
  if (!API_CONFIG.isConnected) {
    return {
      success: false,
      error: {
        code: 'BACKEND_NOT_CONNECTED',
        message: 'Media analysis service is not available',
        details: 'The backend service required for media analysis is not yet connected. This feature will be available once the backend infrastructure is set up.',
      },
    };
  }

  // This will call the actual backend when connected
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: errorData.code || 'API_ERROR',
          message: errorData.message || 'Failed to analyze media',
          details: errorData.details,
        },
      };
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return {
        success: false,
        error: {
          code: 'TIMEOUT',
          message: 'Request timed out',
          details: 'The media analysis took too long. Please try again.',
        },
      };
    }

    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to the service',
        details: 'Please check your internet connection and try again.',
      },
    };
  }
}

/**
 * Request download preparation for selected format
 */
export async function prepareDownload(request: DownloadRequest): Promise<DownloadResult> {
  if (!API_CONFIG.isConnected) {
    return {
      success: false,
      error: {
        code: 'BACKEND_NOT_CONNECTED',
        message: 'Download service is not available',
        details: 'The backend service required for downloads is not yet connected.',
      },
    };
  }

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/download/prepare`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: errorData.code || 'DOWNLOAD_ERROR',
          message: errorData.message || 'Failed to prepare download',
          details: errorData.details,
        },
      };
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Unable to prepare download',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Check if the backend is connected and available
 */
export function isBackendConnected(): boolean {
  return API_CONFIG.isConnected;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Format duration for display
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
