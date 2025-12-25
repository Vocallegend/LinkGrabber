// Media analysis types for LinkGrabber
// These types define the API interface for backend integration

export type MediaType = 'video' | 'audio' | 'image';

export type MediaFormat = {
  id: string;
  format: string; // e.g., 'mp4', 'webm', 'mp3', 'm4a'
  quality: string; // e.g., '1080p', '720p', '320kbps'
  resolution?: string; // e.g., '1920x1080'
  fileSize: number; // in bytes
  fileSizeFormatted: string; // e.g., '150 MB'
  hasVideo: boolean;
  hasAudio: boolean;
  codec?: string;
  bitrate?: number;
};

export type MediaInfo = {
  id: string;
  url: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration: number; // in seconds
  durationFormatted: string; // e.g., '12:34'
  mediaType: MediaType;
  formats: MediaFormat[];
  previewUrl?: string;
  source: string; // platform identifier
  uploadDate?: string;
  viewCount?: number;
};

export type AnalysisResult = {
  success: boolean;
  data?: MediaInfo;
  error?: AnalysisError;
};

export type AnalysisError = {
  code: string;
  message: string;
  details?: string;
};

export type DownloadRequest = {
  mediaId: string;
  formatId: string;
};

export type DownloadResult = {
  success: boolean;
  downloadUrl?: string;
  expiresAt?: string;
  error?: AnalysisError;
};

export type DownloadProgress = {
  status: 'preparing' | 'processing' | 'ready' | 'failed';
  progress: number; // 0-100
  message?: string;
};

// URL validation result
export type UrlValidation = {
  isValid: boolean;
  error?: string;
};
