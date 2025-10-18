import { cloudinaryService, CloudinaryUploadResponse } from '../api/services/cloudinary.service';

export interface ImageUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface MultipleImageUploadResult {
  success: boolean;
  urls: string[];
  errors: string[];
}

/**
 * Upload a single image to Cloudinary
 */
export const uploadSingleImage = async (file: File): Promise<ImageUploadResult> => {
  try {
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' };
    }

    // Validate file size (20MB max)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      return { success: false, error: 'File size must be less than 20MB' };
    }

    const response: CloudinaryUploadResponse = await cloudinaryService.uploadImageWithProgress(file);
    
    if (response.success && response.data?.url) {
      return { success: true, url: response.data.url };
    } else {
      return { success: false, error: response.message || 'Upload failed' };
    }
  } catch (error: any) {
    console.error('Image upload error:', error);
    
    // Handle specific error types
    if (error.code === 'ECONNABORTED') {
      return { 
        success: false, 
        error: `Upload timeout: File "${file.name}" is too large or network is too slow. Please try with a smaller image.` 
      };
    } else if (error.response?.status === 413) {
      return { 
        success: false, 
        error: `File "${file.name}" is too large. Please use an image smaller than 20MB.` 
      };
    } else if (error.response?.status >= 500) {
      return { 
        success: false, 
        error: `Server error: Please try again later.` 
      };
    } else {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      };
    }
  }
};

/**
 * Upload multiple images to Cloudinary
 */
export const uploadMultipleImages = async (files: File[]): Promise<MultipleImageUploadResult> => {
  const urls: string[] = [];
  const errors: string[] = [];

  // Upload all images in parallel
  const uploadPromises = files.map(file => uploadSingleImage(file));
  const uploadResults = await Promise.all(uploadPromises);

  // Process results
  uploadResults.forEach((result, index) => {
    if (result.success && result.url) {
      urls.push(result.url);
    } else {
      errors.push(`File ${index + 1}: ${result.error || 'Upload failed'}`);
    }
  });

  return {
    success: errors.length === 0,
    urls,
    errors,
  };
};

/**
 * Upload image with progress tracking
 */
export const uploadImageWithProgress = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<ImageUploadResult> => {
  try {
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' };
    }

    // Validate file size (20MB max)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      return { success: false, error: 'File size must be less than 20MB' };
    }

    const response: CloudinaryUploadResponse = await cloudinaryService.uploadImageWithProgress(
      file,
      onProgress
    );
    
    if (response.success && response.data?.url) {
      return { success: true, url: response.data.url };
    } else {
      return { success: false, error: response.message || 'Upload failed' };
    }
  } catch (error) {
    console.error('Image upload error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
};

/**
 * Extract files from form data for image upload
 */
export const extractImageFiles = (formData: any): File[] => {
  const files: File[] = [];

  console.log('Extracting files from form data...');

  // Extract head image - try multiple possible property names
  const headImageFile = formData.headImageFile || formData.headImage || formData.headImagePreview;
  if (headImageFile && headImageFile instanceof File) {
    console.log('Found head image file:', headImageFile);
    files.push(headImageFile);
  }

  // Extract title background image - try multiple possible property names
  const titleBackgroundImageFile = formData.titleBackgroundImageFile || 
                                  formData.titleBackgroundImage || 
                                  formData.titleBackgroundImagePreview;
  if (titleBackgroundImageFile && titleBackgroundImageFile instanceof File) {
    console.log('Found title background image file:', titleBackgroundImageFile);
    files.push(titleBackgroundImageFile);
  }

  // Extract template images - try multiple possible property names
  if (formData.templates && Array.isArray(formData.templates)) {
    console.log('Processing templates:', formData.templates.length);
    formData.templates.forEach((template: any, index: number) => {
      // Extract first image
      const templateImageFile = template.imageFile || 
                               template.image || 
                               template.imagePreview ||
                               template.file;
      if (templateImageFile && templateImageFile instanceof File) {
        console.log(`Found template ${index} image file:`, templateImageFile);
        files.push(templateImageFile);
      } else {
        console.log(`Template ${index} has no image file:`, template);
      }

      // Extract second image for layered templates
      const secondImageFile = template.secondImage || 
                             template.secondImagePreview ||
                             template.secondImageFile;
      if (secondImageFile && secondImageFile instanceof File) {
        console.log(`Found template ${index} second image file:`, secondImageFile);
        files.push(secondImageFile);
      }
    });
  }

  // Also check for any other file properties that might contain images
  Object.keys(formData).forEach(key => {
    if (key.toLowerCase().includes('image') || key.toLowerCase().includes('file')) {
      const value = formData[key];
      if (value instanceof File) {
        console.log(`Found additional file in ${key}:`, value);
        files.push(value);
      }
    }
  });

  console.log(`Total files extracted: ${files.length}`);
  return files;
};

/**
 * Replace file objects with URLs in form data
 */
export const replaceFilesWithUrls = (formData: any, uploadResults: { [key: string]: string }): any => {
  const updatedData = { ...formData };

  console.log('Replacing files with URLs...');
  console.log('Upload results:', uploadResults);

  // Replace head image - try multiple possible property names
  if (uploadResults.headImageUrl) {
    updatedData.headImageUrl = uploadResults.headImageUrl;
    // Clean up file properties
    delete updatedData.headImageFile;
    delete updatedData.headImage;
    delete updatedData.headImagePreview;
    console.log('Replaced head image with URL:', uploadResults.headImageUrl);
  }

  // Replace title background image - try multiple possible property names
  if (uploadResults.titleBackgroundImageUrl) {
    updatedData.titleBackgroundImageUrl = uploadResults.titleBackgroundImageUrl;
    // Clean up file properties
    delete updatedData.titleBackgroundImageFile;
    delete updatedData.titleBackgroundImage;
    delete updatedData.titleBackgroundImagePreview;
    console.log('Replaced title background image with URL:', uploadResults.titleBackgroundImageUrl);
  }

  // Replace template images
  if (updatedData.templates && Array.isArray(updatedData.templates)) {
    updatedData.templates = updatedData.templates.map((template: any, index: number) => {
      const updatedTemplate = { ...template };
      
      // Replace first image
      const templateImageKey = `template_${index}_imageUrl`;
      if (uploadResults[templateImageKey]) {
        updatedTemplate.imageUrl = uploadResults[templateImageKey];
        // Clean up file properties
        delete updatedTemplate.imageFile;
        delete updatedTemplate.image;
        delete updatedTemplate.imagePreview;
        delete updatedTemplate.file;
        console.log(`Replaced template ${index} image with URL:`, uploadResults[templateImageKey]);
      }

      // Replace second image for layered templates
      const secondImageKey = `template_${index}_secondImageUrl`;
      if (uploadResults[secondImageKey]) {
        updatedTemplate.secondImageUrl = uploadResults[secondImageKey];
        // Clean up file properties
        delete updatedTemplate.secondImage;
        delete updatedTemplate.secondImagePreview;
        delete updatedTemplate.secondImageFile;
        console.log(`Replaced template ${index} second image with URL:`, uploadResults[secondImageKey]);
      }

      return updatedTemplate;
    });
  }

  return updatedData;
};
