import React, { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';
import { templatesService } from '../api/services';
import {
  Template,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  TemplateFilters,
  TemplateUploadRequest,
  PaginatedResponse,
  UploadProgress,
} from '../api/types';

export function useTemplates(filters?: TemplateFilters) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const {
    data: templatesData,
    loading: loadingTemplates,
    error: templatesError,
    execute: fetchTemplates,
  } = useApi<{ success: boolean; data: Template[] }>(
    () => templatesService.getTemplates(filters),
    { immediate: true }
  );

  const {
    loading: creatingTemplate,
    error: createError,
    execute: createTemplate,
  } = useApi<{ success: boolean; message: string; data: Template }>(templatesService.createTemplate);

  const {
    loading: updatingTemplate,
    error: updateError,
    execute: updateTemplate,
  } = useApi<{ success: boolean; message: string; data?: Template }>(templatesService.updateTemplate);

  const {
    loading: deletingTemplate,
    error: deleteError,
    execute: deleteTemplate,
  } = useApi<{ success: boolean; message: string }>(templatesService.deleteTemplate);

  const {
    loading: uploadingImage,
    error: uploadError,
    execute: uploadImage,
  } = useApi<{ url: string; filename: string }>(templatesService.uploadTemplateImage);

  // Update templates when data changes
  useEffect(() => {
    if (templatesData && templatesData.success) {
      setTemplates(templatesData.data);
      // Since your API doesn't return pagination, we'll set default values
      setPagination({
        page: 1,
        limit: 10,
        total: templatesData.data.length,
        totalPages: 1,
      });
    }
  }, [templatesData]);

  const handleCreateTemplate = useCallback(async (templateData: CreateTemplateRequest) => {
    try {
      const result = await createTemplate(templateData);
      if (result.success && result.data) {
        setTemplates(prev => [result.data!, ...prev]);
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to create template');
      }
    } catch (error) {
      throw error;
    }
  }, [createTemplate]);

  const handleUpdateTemplate = useCallback(async (id: string, templateData: UpdateTemplateRequest) => {
    try {
      const result = await updateTemplate(id, templateData);
      if (result.success && result.data) {
        setTemplates(prev => prev.map(template => 
          template._id === id ? result.data! : template
        ));
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to update template');
      }
    } catch (error) {
      throw error;
    }
  }, [updateTemplate]);

  const handleDeleteTemplate = useCallback(async (id: string) => {
    try {
      const result = await deleteTemplate(id);
      if (result.success) {
        setTemplates(prev => prev.filter(template => template._id !== id));
      } else {
        throw new Error(result.message || 'Failed to delete template');
      }
    } catch (error) {
      throw error;
    }
  }, [deleteTemplate]);

  const handleUploadImage = useCallback(async (
    uploadData: TemplateUploadRequest,
    onProgress?: (progress: UploadProgress) => void
  ) => {
    try {
      const result = await uploadImage(uploadData, onProgress);
      return result;
    } catch (error) {
      throw error;
    }
  }, [uploadImage]);

  const refreshTemplates = useCallback(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    // Data
    templates,
    pagination,
    
    // Loading states
    loading: loadingTemplates,
    creating: creatingTemplate,
    updating: updatingTemplate,
    deleting: deletingTemplate,
    uploading: uploadingImage,
    
    // Error states
    error: templatesError,
    createError,
    updateError,
    deleteError,
    uploadError,
    
    // Actions
    createTemplate: handleCreateTemplate,
    updateTemplate: handleUpdateTemplate,
    deleteTemplate: handleDeleteTemplate,
    uploadImage: handleUploadImage,
    refreshTemplates,
  };
}

export function useTemplate(id: string) {
  const {
    data: templateData,
    loading,
    error,
    execute: fetchTemplate,
  } = useApi<{ success: boolean; data: Template }>(() => templatesService.getTemplate(id), { immediate: true });

  return {
    template: templateData?.success ? templateData.data : null,
    loading,
    error,
    refetch: fetchTemplate,
  };
}
