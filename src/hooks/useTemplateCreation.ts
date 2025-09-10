import { useState } from 'react';
import { CreateTemplateRequest, TemplateType } from '../api/types';
import { uploadMultipleImages, extractImageFiles, replaceFilesWithUrls } from '../utils/imageUpload.utils';

export const useTemplateCreation = (templateType: TemplateType = 'story') => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugFormData, setDebugFormData] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Default Category';
  };

  const handleSave = async (formData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Store form data for debugging (only in development)
      if (process.env.NODE_ENV === 'development') {
        setDebugFormData(formData);
        console.log('Form Data Structure:', formData);
        console.log('Form Data Keys:', Object.keys(formData));
        console.log('Head Image File:', formData.headImageFile);
        console.log('Title Background Image File:', formData.titleBackgroundImageFile);
        console.log('Templates:', formData.templates);
      }
      
      // Step 1: Extract all image files from form data
      const imageFiles = extractImageFiles(formData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Extracted Image Files:', imageFiles);
      }
      
      if (imageFiles.length === 0) {
        throw new Error('No images found to upload');
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Uploading images to Cloudinary...', imageFiles.length, 'files');
      }
      setUploadStatus(`Uploading ${imageFiles.length} images...`);
      setUploadProgress(0);
      
      // Step 2: Upload all images to Cloudinary
      const uploadResults = await uploadMultipleImages(imageFiles);
      
      if (!uploadResults.success) {
        throw new Error(`Image upload failed: ${uploadResults.errors.join(', ')}`);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Images uploaded successfully:', uploadResults.urls);
      }
      setUploadStatus('Images uploaded successfully!');
      setUploadProgress(100);

      // Step 3: Create mapping of uploaded URLs
      const urlMapping: { [key: string]: string } = {};
      let urlIndex = 0;

      if (process.env.NODE_ENV === 'development') {
        console.log('Creating URL mapping...');
      }

      // Map head image - try multiple possible property names
      const headImageFile = formData.headImageFile || formData.headImage || formData.headImagePreview;
      if (headImageFile && uploadResults.urls[urlIndex]) {
        urlMapping.headImageUrl = uploadResults.urls[urlIndex];
        if (process.env.NODE_ENV === 'development') {
          console.log('Mapped head image URL:', uploadResults.urls[urlIndex]);
        }
        urlIndex++;
      }

      // Map title background image - try multiple possible property names
      const titleBackgroundImageFile = formData.titleBackgroundImageFile || 
                                      formData.titleBackgroundImage || 
                                      formData.titleBackgroundImagePreview;
      if (titleBackgroundImageFile && uploadResults.urls[urlIndex]) {
        urlMapping.titleBackgroundImageUrl = uploadResults.urls[urlIndex];
        if (process.env.NODE_ENV === 'development') {
          console.log('Mapped title background image URL:', uploadResults.urls[urlIndex]);
        }
        urlIndex++;
      }

      // Map template images - try multiple possible property names
      if (formData.templates && Array.isArray(formData.templates)) {
        formData.templates.forEach((template: any, index: number) => {
          const templateImageFile = template.imageFile || 
                                   template.image || 
                                   template.imagePreview ||
                                   template.file;
          if (templateImageFile && uploadResults.urls[urlIndex]) {
            urlMapping[`template_${index}_imageUrl`] = uploadResults.urls[urlIndex];
            if (process.env.NODE_ENV === 'development') {
              console.log(`Mapped template ${index} image URL:`, uploadResults.urls[urlIndex]);
            }
            urlIndex++;
          }
        });
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Final URL mapping:', urlMapping);
      }

      // Step 4: Replace file objects with URLs in form data
      const updatedFormData = replaceFilesWithUrls(formData, urlMapping);

      // Step 5: Transform form data to match API structure
      const templateData: CreateTemplateRequest = {
        templateType: templateType,
        category: getCategoryFromURL(),
        headImageUrl: updatedFormData.headImageUrl || undefined,
        titleBackgroundImageUrl: updatedFormData.titleBackgroundImageUrl || undefined,
        templates: updatedFormData.templates?.map((template: any) => ({
          imageUrl: template.imageUrl || '',
          price: template.price || '',
          category: template.category || '',
          profileImagePosition: template.profileImagePosition || '',
          userDetailPosition: template.userDetailPosition || '',
          expirationDate: template.expirationDate || undefined,
        })) || []
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('Creating template with data:', templateData);
      }
      setUploadStatus('Creating template...');

      // Step 6: Call API to save template
      const response = await fetch('http://localhost:3000/api/admin/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(templateData),
      });

      const result = await response.json();
      
      if (result.success) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Template saved successfully:", result);
        }
        // Show success toast
        setShowSuccessToast(true);
      } else {
        throw new Error(result.message || 'Failed to save template');
      }
    } catch (err) {
      console.error("Error saving template:", err);
      setError(err instanceof Error ? err.message : 'Failed to save template');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      setUploadStatus('');
    }
  };

  const handleCancel = () => {
    console.log("Cancelled");
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
    isLoading,
    error,
    debugFormData,
    uploadProgress,
    uploadStatus,
    showSuccessToast,
    handleSuccessToastClose,
    getCategoryFromURL,
    handleSave,
    handleCancel,
  };
};
