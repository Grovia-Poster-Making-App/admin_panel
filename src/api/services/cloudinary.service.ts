import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { API_UPLOAD_TIMEOUT } from '../../config/api.config';

export interface CloudinaryUploadResponse {
  success: boolean;
  data: {
    url: string;
  };
  message?: string;
  error?: string;
}

export const cloudinaryService = {
  // Upload single image to Cloudinary
  async uploadImage(file: File): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<CloudinaryUploadResponse>(
      API_ENDPOINTS.UPLOAD.CLOUDINARY,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: API_UPLOAD_TIMEOUT, // 2 minutes for file uploads
      }
    );

    return response.data;
  },

  // Upload multiple images to Cloudinary
  async uploadImages(files: File[]): Promise<CloudinaryUploadResponse[]> {
    const uploadPromises = files.map(file => this.uploadImage(file));
    return Promise.all(uploadPromises);
  },

  // Upload image with progress callback
  async uploadImageWithProgress(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<CloudinaryUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<CloudinaryUploadResponse>(
      API_ENDPOINTS.UPLOAD.CLOUDINARY,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: API_UPLOAD_TIMEOUT, // 2 minutes for file uploads
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(progress);
          }
        },
      }
    );

    return response.data;
  },
};
