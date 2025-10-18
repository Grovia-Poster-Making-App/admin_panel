import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import {
  Template,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  TemplateFilters,
  TemplateUploadRequest,
  TemplateType,
  ApiResponse,
  UploadProgress,
} from '../types';

export const templatesService = {
  // Get all templates with filters
  async getTemplates(filters?: TemplateFilters): Promise<{ success: boolean; data: Template[] }> {
    const response = await apiClient.get<{ success: boolean; data: Template[] }>(
      API_ENDPOINTS.TEMPLATES.BASE,
      { params: filters }
    );
    return response.data;
  },

  // Get template by ID
  async getTemplate(id: string): Promise<{ success: boolean; data: Template }> {
    try {
      // First try the direct GET endpoint
      const response = await apiClient.get<{ success: boolean; data: Template }>(
        API_ENDPOINTS.TEMPLATES.GET(id)
      );
      return response.data;
    } catch (error: any) {
      // If direct GET fails, try to get it from the templates list
      try {
        const templatesResponse = await apiClient.get<{ success: boolean; data: Template[] }>(
          API_ENDPOINTS.TEMPLATES.BASE
        );
        
        if (templatesResponse.data.success && templatesResponse.data.data) {
          const template = templatesResponse.data.data.find(t => t._id === id);
          if (template) {
            return { success: true, data: template };
          }
        }
        
        throw new Error('Template not found in templates list');
      } catch (listError: any) {
        throw new Error(`Template with ID ${id} not found`);
      }
    }
  },

  // Create new template
  async createTemplate(templateData: CreateTemplateRequest): Promise<{ success: boolean; message: string; data: Template }> {
    const response = await apiClient.post<{ success: boolean; message: string; data: Template }>(
      API_ENDPOINTS.TEMPLATES.CREATE,
      templateData
    );
    return response.data;
  },

  // Update template
  async updateTemplate(id: string, templateData: UpdateTemplateRequest): Promise<{ success: boolean; message: string; data?: Template }> {
    const response = await apiClient.put<{ success: boolean; message: string; data?: Template }>(
      API_ENDPOINTS.TEMPLATES.UPDATE(id),
      templateData
    );
    return response.data;
  },

  // Delete template
  async deleteTemplate(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete<{ success: boolean; message: string }>(
      API_ENDPOINTS.TEMPLATES.DELETE(id)
    );
    return response.data;
  },

  // Get templates by category
  async getTemplatesByCategory(category: string, filters?: TemplateFilters): Promise<{ success: boolean; data: Template[] }> {
    const response = await apiClient.get<{ success: boolean; data: Template[] }>(
      API_ENDPOINTS.TEMPLATES.BY_CATEGORY(category),
      { params: filters }
    );
    return response.data;
  },

  // Get templates by type
  async getTemplatesByType(templateType: TemplateType, filters?: TemplateFilters): Promise<{ success: boolean; data: Template[] }> {
    const response = await apiClient.get<{ success: boolean; data: Template[] }>(
      API_ENDPOINTS.TEMPLATES.BY_TYPE(templateType),
      { params: filters }
    );
    return response.data;
  },

  // Get templates by type and category
  async getTemplatesByTypeAndCategory(templateType: TemplateType, category: string, filters?: TemplateFilters): Promise<{ success: boolean; data: Template[] }> {
    const response = await apiClient.get<{ success: boolean; data: Template[] }>(
      API_ENDPOINTS.TEMPLATES.BY_TYPE_AND_CATEGORY(templateType, category),
      { params: filters }
    );
    return response.data;
  },

  // Upload template image
  async uploadTemplateImage(
    uploadData: TemplateUploadRequest,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', uploadData.file);
    formData.append('templateId', uploadData.templateId);
    formData.append('type', uploadData.type);

    const response = await apiClient.post<ApiResponse<{ url: string; filename: string }>>(
      API_ENDPOINTS.TEMPLATES.UPLOAD_IMAGE,
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

  // Duplicate template
  async duplicateTemplate(id: string, newTitle?: string): Promise<Template> {
    const response = await apiClient.post<ApiResponse<Template>>(
      `${API_ENDPOINTS.TEMPLATES.BASE}/${id}/duplicate`,
      { title: newTitle }
    );
    return response.data.data;
  },

  // Get template categories
  async getTemplateCategories(): Promise<{ id: string; name: string; count: number }[]> {
    const response = await apiClient.get<ApiResponse<{ id: string; name: string; count: number }[]>>(
      `${API_ENDPOINTS.TEMPLATES.BASE}/categories`
    );
    return response.data.data;
  },
};
