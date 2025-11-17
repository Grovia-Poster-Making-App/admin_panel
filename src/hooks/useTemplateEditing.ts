import { useState, useEffect } from 'react';
import { Template, UpdateTemplateRequest } from '../api/types';
import { uploadMultipleImages, extractImageFiles, replaceFilesWithUrls } from '../utils/imageUpload.utils';
import { templatesService } from '../api/services/templates.service';

export const useTemplateEditing = (templateId: string) => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load template data
  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await templatesService.getTemplate(templateId);
        
        if (result.success && result.data) {
          console.log('Template loaded successfully:', result.data);
          setTemplate(result.data);
        } else {
          throw new Error('Failed to load template');
        }
      } catch (err) {
        console.error('Error loading template:', err);
        setError(err instanceof Error ? err.message : 'Failed to load template');
      } finally {
        setIsLoading(false);
      }
    };

    if (templateId) {
      loadTemplate();
    }
  }, [templateId]);

  const handleSave = async (formData: any) => {
    try {
      setIsSaving(true);
      setSaveError(null);
      
      console.log('Saving updated template with data:', formData);
      console.log('Templates array in formData:', formData.templates);
      if (formData.templates && formData.templates.length > 0) {
        console.log('First template item:', formData.templates[0]);
        console.log('First template imageUrl:', formData.templates[0].imageUrl);
        console.log('First template image:', formData.templates[0].image);
        console.log('First template imagePreview:', formData.templates[0].imagePreview);
      }
      
      // Step 1: Extract all image files from form data
      const imageFiles = extractImageFiles(formData);
      
      if (imageFiles.length === 0) {
        // No new images to upload, just update the template data
        const templateData: UpdateTemplateRequest = {};
        
        // Only add top-level fields that have actual values
        if (formData.title) templateData.title = formData.title;
        if (formData.subtitle) templateData.subtitle = formData.subtitle;
        if (formData.headImageUrl) templateData.headImageUrl = formData.headImageUrl;
        if (formData.titleBackgroundImageUrl) templateData.titleBackgroundImageUrl = formData.titleBackgroundImageUrl;
        if (formData.templateTypeDropdown) templateData.templateTypeDropdown = formData.templateTypeDropdown;
        if (formData.templateTitleSection) templateData.templateTitleSection = formData.templateTitleSection;
        
        // Always include isPinned as it's a boolean
        templateData.isPinned = formData.headImagePinned !== undefined ? formData.headImagePinned : false;
        
        // Transform templates array - only include fields with values
        if (formData.templates && formData.templates.length > 0) {
          templateData.templates = formData.templates.map((template: any) => {
            const templateItem: any = {};
            
            // Handle image URL - could be in imageUrl, image, or imagePreview field
            const imageUrl = template.imageUrl || template.image || template.imagePreview;
            // Always set imageUrl to avoid validation errors (use the value from form if exists, otherwise keep existing)
            templateItem.imageUrl = (imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '') ? imageUrl : template.imageUrl || '';
            
            // Handle second image URL for layered templates
            const secondImageUrl = template.secondImageUrl || template.secondImage || template.secondImagePreview;
            if (secondImageUrl && typeof secondImageUrl === 'string') {
              templateItem.secondImageUrl = secondImageUrl;
            }
            
            // Only add other fields that have actual non-empty values
            if (template.title) templateItem.title = template.title;
            if (template.subtitle) templateItem.subtitle = template.subtitle;
            if (template.filterTitle) templateItem.filterTitle = template.filterTitle;
            if (template.price) templateItem.price = template.price;
            // Use the main template category instead of individual template category
            templateItem.category = template.category;
            if (template.profileImagePosition) templateItem.profileImagePosition = template.profileImagePosition;
            if (template.userDetailPosition) templateItem.userDetailPosition = template.userDetailPosition;
            if (template.expirationDate) templateItem.expirationDate = template.expirationDate;
            if (template.eventDate) templateItem.eventDate = template.eventDate;
            if (template.url) templateItem.url = template.url;
            if (template.shortDescription) templateItem.shortDescription = template.shortDescription;
            if (template.longDescription) templateItem.longDescription = template.longDescription;
            if (template.expiresAt) templateItem.expiresAt = template.expiresAt;
            if (template.offerType) templateItem.offerType = template.offerType;
            if (template.discount) templateItem.discount = template.discount;
            if (template.termsForOffer) templateItem.termsForOffer = template.termsForOffer;
            if (template.buttonText) templateItem.buttonText = template.buttonText;
            
            // Always include boolean fields
            templateItem.isLayered = template.isLayered !== undefined ? template.isLayered : false;
            templateItem.isVisible = template.isVisible !== undefined ? template.isVisible : true;
            templateItem.isBannerClickable = template.isBannerClickable !== undefined ? template.isBannerClickable : true;
            
            console.log('Transformed template item:', templateItem);
            return templateItem;
          });
        }

        console.log('Updating template with data:', templateData);
        console.log('Template ID:', templateId);
        console.log('Full template data structure:', JSON.stringify(templateData, null, 2));
        try {
          const result = await templatesService.updateTemplate(templateId, templateData);
          
          if (result.success) {
            console.log("Template updated successfully:", result);
            setShowSuccessToast(true);
            // Update local template data
            setTemplate(prev => prev ? { ...prev, ...templateData } : null);
          } else {
            throw new Error(result.message || 'Failed to update template');
          }
        } catch (error: any) {
          console.error('Error updating template:', error);
          console.error('Error response:', error.response?.data);
          console.error('Error status:', error.response?.status);
          throw error;
        }
        return;
      }

      console.log('Uploading images to Cloudinary...', imageFiles.length, 'files');
      setUploadStatus(`Uploading ${imageFiles.length} images...`);
      setUploadProgress(0);
      
      // Step 2: Upload all images to Cloudinary
      const uploadResults = await uploadMultipleImages(imageFiles);
      
      if (!uploadResults.success) {
        throw new Error(`Image upload failed: ${uploadResults.errors.join(', ')}`);
      }

      console.log('Images uploaded successfully:', uploadResults.urls);
      setUploadStatus('Images uploaded successfully!');
      setUploadProgress(100);

      // Step 3: Create mapping of uploaded URLs
      const urlMapping: { [key: string]: string } = {};
      let urlIndex = 0;

      // Map head image
      const headImageFile = formData.headImageFile || formData.headImage || formData.headImagePreview;
      if (headImageFile && uploadResults.urls[urlIndex]) {
        urlMapping.headImageUrl = uploadResults.urls[urlIndex];
        console.log('Mapped head image URL:', uploadResults.urls[urlIndex]);
        urlIndex++;
      }

      // Map title background image
      const titleBackgroundImageFile = formData.titleBackgroundImageFile || 
                                      formData.titleBackgroundImage || 
                                      formData.titleBackgroundImagePreview;
      if (titleBackgroundImageFile && uploadResults.urls[urlIndex]) {
        urlMapping.titleBackgroundImageUrl = uploadResults.urls[urlIndex];
        console.log('Mapped title background image URL:', uploadResults.urls[urlIndex]);
        urlIndex++;
      }

      // Map template images
      if (formData.templates && Array.isArray(formData.templates)) {
        formData.templates.forEach((template: any, index: number) => {
          // Map first image
          const templateImageFile = template.imageFile || 
                                   template.image || 
                                   template.imagePreview ||
                                   template.file;
          if (templateImageFile && uploadResults.urls[urlIndex]) {
            urlMapping[`template_${index}_imageUrl`] = uploadResults.urls[urlIndex];
            console.log(`Mapped template ${index} image URL:`, uploadResults.urls[urlIndex]);
            urlIndex++;
          }

          // Map second image for layered templates
          const secondImageFile = template.secondImage || 
                                 template.secondImagePreview ||
                                 template.secondImageFile;
          if (secondImageFile && uploadResults.urls[urlIndex]) {
            urlMapping[`template_${index}_secondImageUrl`] = uploadResults.urls[urlIndex];
            console.log(`Mapped template ${index} second image URL:`, uploadResults.urls[urlIndex]);
            urlIndex++;
          }
        });
      }

      console.log('Final URL mapping:', urlMapping);

      // Step 4: Replace file objects with URLs in form data
      const updatedFormData = replaceFilesWithUrls(formData, urlMapping);

      // Step 5: Transform form data to match API structure
      const templateData: UpdateTemplateRequest = {};
      
      // Only add top-level fields that have actual values
      if (updatedFormData.title) templateData.title = updatedFormData.title;
      if (updatedFormData.subtitle) templateData.subtitle = updatedFormData.subtitle;
      if (updatedFormData.headImageUrl) templateData.headImageUrl = updatedFormData.headImageUrl;
      if (updatedFormData.titleBackgroundImageUrl) templateData.titleBackgroundImageUrl = updatedFormData.titleBackgroundImageUrl;
      if (updatedFormData.templateTypeDropdown) templateData.templateTypeDropdown = updatedFormData.templateTypeDropdown;
      if (updatedFormData.templateTitleSection) templateData.templateTitleSection = updatedFormData.templateTitleSection;
      
      // Always include isPinned as it's a boolean
      templateData.isPinned = updatedFormData.headImagePinned !== undefined ? updatedFormData.headImagePinned : false;
      
      // Transform templates array - only include fields with values
      if (updatedFormData.templates && updatedFormData.templates.length > 0) {
        templateData.templates = updatedFormData.templates.map((template: any) => {
          const templateItem: any = {};
          
          // Handle image URL - could be in imageUrl, image, or imagePreview field
          const imageUrl = template.imageUrl || template.image || template.imagePreview;
          // Always set imageUrl to avoid validation errors (use the value from form if exists, otherwise keep existing)
          templateItem.imageUrl = (imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '') ? imageUrl : template.imageUrl || '';
          
          // Handle second image URL for layered templates
          const secondImageUrl = template.secondImageUrl || template.secondImage || template.secondImagePreview;
          if (secondImageUrl && typeof secondImageUrl === 'string') {
            templateItem.secondImageUrl = secondImageUrl;
          }
          
          // Only add other fields that have actual non-empty values
          if (template.title) templateItem.title = template.title;
          if (template.subtitle) templateItem.subtitle = template.subtitle;
          if (template.filterTitle) templateItem.filterTitle = template.filterTitle;
          if (template.price) templateItem.price = template.price;
          if (template.category) templateItem.category = template.category;
          if (template.profileImagePosition) templateItem.profileImagePosition = template.profileImagePosition;
          if (template.userDetailPosition) templateItem.userDetailPosition = template.userDetailPosition;
          if (template.expirationDate) templateItem.expirationDate = template.expirationDate;
          if (template.eventDate) templateItem.eventDate = template.eventDate;
          if (template.url) templateItem.url = template.url;
          if (template.shortDescription) templateItem.shortDescription = template.shortDescription;
          if (template.longDescription) templateItem.longDescription = template.longDescription;
          if (template.expiresAt) templateItem.expiresAt = template.expiresAt;
          if (template.offerType) templateItem.offerType = template.offerType;
          if (template.discount) templateItem.discount = template.discount;
          if (template.termsForOffer) templateItem.termsForOffer = template.termsForOffer;
          if (template.buttonText) templateItem.buttonText = template.buttonText;
          
          // Always include boolean fields
          templateItem.isLayered = template.isLayered !== undefined ? template.isLayered : false;
          templateItem.isVisible = template.isVisible !== undefined ? template.isVisible : true;
          templateItem.isBannerClickable = template.isBannerClickable !== undefined ? template.isBannerClickable : true;
          
          console.log('Transformed template item (with images):', templateItem);
          return templateItem;
        });
      }

      console.log('Updating template with data:', templateData);
      console.log('Template ID:', templateId);
      console.log('Full template data structure:', JSON.stringify(templateData, null, 2));
      setUploadStatus('Updating template...');

      // Step 6: Call API to update template
      try {
        const result = await templatesService.updateTemplate(templateId, templateData);
        
        if (result.success) {
          console.log("Template updated successfully:", result);
          setShowSuccessToast(true);
          // Update local template data
          setTemplate(prev => prev ? { ...prev, ...templateData } : null);
        } else {
          throw new Error(result.message || 'Failed to update template');
        }
      } catch (error: any) {
        console.error('Error updating template:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error;
      }
    } catch (err) {
      console.error("Error updating template:", err);
      setSaveError(err instanceof Error ? err.message : 'Failed to update template');
    } finally {
      setIsSaving(false);
      setUploadProgress(0);
      setUploadStatus('');
    }
  };

  const handleCancel = () => {
    console.log("Cancelled editing");
    // Navigate back to templates page
    window.history.back();
  };

  const handleSuccessToastClose = () => {
    setShowSuccessToast(false);
    // Navigate back to templates page after a short delay
    setTimeout(() => {
      window.history.back();
    }, 500);
  };

  return {
    template,
    isLoading,
    error,
    isSaving,
    saveError,
    uploadProgress,
    uploadStatus,
    showSuccessToast,
    handleSuccessToastClose,
    handleSave,
    handleCancel,
  };
};

