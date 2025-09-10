import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, UploadProgress } from '../types';

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

export interface BulkUploadResponse {
  successful: UploadResponse[];
  failed: {
    filename: string;
    error: string;
  }[];
}

export const uploadService = {
  // Upload single image
  async uploadImage(
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');

    const response = await apiClient.post<ApiResponse<UploadResponse>>(
      API_ENDPOINTS.UPLOAD.IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          if (onProgress && progressEvent.total) {
            const progress: UploadProgress = {
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
            };
            onProgress(progress);
          }
        },
      }
    );
    return response.data.data;
  },

  // Upload document
  async uploadDocument(
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'document');

    const response = await apiClient.post<ApiResponse<UploadResponse>>(
      API_ENDPOINTS.UPLOAD.DOCUMENT,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          if (onProgress && progressEvent.total) {
            const progress: UploadProgress = {
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
            };
            onProgress(progress);
          }
        },
      }
    );
    return response.data.data;
  },

  // Bulk upload
  async bulkUpload(
    files: File[],
    onProgress?: (progress: UploadProgress) => void
  ): Promise<BulkUploadResponse> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });

    const response = await apiClient.post<ApiResponse<BulkUploadResponse>>(
      API_ENDPOINTS.UPLOAD.BULK,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          if (onProgress && progressEvent.total) {
            const progress: UploadProgress = {
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
            };
            onProgress(progress);
          }
        },
      }
    );
    return response.data.data;
  },

  // Delete uploaded file
  async deleteFile(filename: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.UPLOAD.IMAGE}/${filename}`);
  },

  // Get upload limits
  async getUploadLimits(): Promise<{
    maxFileSize: number;
    allowedTypes: string[];
    maxFiles: number;
  }> {
    const response = await apiClient.get<ApiResponse<{
      maxFileSize: number;
      allowedTypes: string[];
      maxFiles: number;
    }>>(`${API_ENDPOINTS.UPLOAD.IMAGE}/limits`);
    return response.data.data;
  },
};
