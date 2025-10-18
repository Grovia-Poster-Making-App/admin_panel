import React from "react";
import { useTemplateEditing } from "../../hooks/useTemplateEditing";
import Toast from "../../components/UI/Toast";
import BannerTemplates, { BannerTemplate } from "../../components/templates/bannerTemplates";
import classes from "../createTemplates/Banner.module.scss";

const EditBanner: React.FC = () => {
  // Get template ID from URL
  const getTemplateIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };

  const templateId = getTemplateIdFromURL();
  
  const {
    template,
    isLoading: loadingTemplate,
    error: loadError,
    isSaving,
    saveError,
    showSuccessToast,
    handleSuccessToastClose,
    handleSave,
    handleCancel,
  } = useTemplateEditing(templateId || '');

  const [headImage, setHeadImage] = React.useState<File | null>(null);
  const [headImagePreview, setHeadImagePreview] = React.useState<string>("");
  const [templates, setTemplates] = React.useState<BannerTemplate[]>([]);
  const headImageInputRef = React.useRef<HTMLInputElement>(null);

  // Initialize form data from template
  React.useEffect(() => {
    if (template) {
      // Set head image preview
      if (template.headImageUrl) {
        setHeadImagePreview(template.headImageUrl);
      }
      
      // Set banner templates
      if (template.templates && template.templates.length > 0) {
        const bannerTemplates: BannerTemplate[] = template.templates.map((t: any, index: number) => ({
          id: String(index + 1),
          image: null,
          imagePreview: t.imageUrl || "",
          url: t.url || "",
          title: t.title || "",
          subtitle: t.subtitle || "",
          shortDescription: t.shortDescription || "",
          longDescription: t.longDescription || "",
          expiresAt: t.expiresAt ? new Date(t.expiresAt).toISOString().split('T')[0] : "",
          isVisible: t.isVisible !== undefined ? t.isVisible : true,
          offerType: t.offerType || "",
          discount: t.discount || "",
          termsForOffer: t.termsForOffer || "",
          buttonText: t.buttonText || "Pay Now",
          isBannerClickable: t.isBannerClickable !== undefined ? t.isBannerClickable : true,
          filterTitle: t.filterTitle || "",
        }));
        setTemplates(bannerTemplates);
      } else {
        // Initialize with one empty template
        setTemplates([{
          id: "1",
          image: null,
          imagePreview: "",
          url: "",
          title: "",
          subtitle: "",
          shortDescription: "",
          longDescription: "",
          expiresAt: "",
          isVisible: true,
          offerType: "",
          discount: "",
          termsForOffer: "",
          buttonText: "Pay Now",
          isBannerClickable: true,
          filterTitle: "",
        }]);
      }
    }
  }, [template]);

  const offerTypes = [
    "deal",
    "festival",
    "payment offer",
    "seasonal sale",
    "limited time",
    "flash sale",
    "clearance",
    "new arrival",
  ];

  const buttonTextOptions = [
    "Pay Now",
    "Avail Offer",
    "Explore Now",
    "Submit",
    "Get Started",
    "Learn More",
    "Shop Now",
    "Book Now",
  ];

  const handleHeadImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setHeadImage(file);
      setHeadImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTemplatesChange = (updatedTemplates: any[]) => {
    setTemplates(updatedTemplates as BannerTemplate[]);
  };

  const handleSaveTemplates = () => {
    const bannerData: any = {
      headImage: headImage,
      headImagePreview: headImagePreview,
      headImageUrl: headImagePreview, // Use existing URL if no new image
      templates: templates,
    };
    handleSave(bannerData);
  };

  // Show loading state while fetching template
  if (loadingTemplate) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="loading-spinner">⏳</div>
        <h3>Loading template...</h3>
        <p>Please wait while we fetch the template data</p>
      </div>
    );
  }

  // Show error state if template failed to load
  if (loadError || !template) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="error-icon">❌</div>
        <h3>Error loading template</h3>
        <p>{loadError || 'Template not found'}</p>
        <button 
          onClick={() => window.history.back()}
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={classes.bannerContainer}>
      {/* Show error message if there's a save error */}
      {saveError && (
        <div style={{ 
          color: 'red', 
          marginBottom: '10px', 
          padding: '10px', 
          border: '1px solid red', 
          borderRadius: '4px' 
        }}>
          Error: {saveError}
        </div>
      )}

      <div className={classes.header}>
        <div className={classes.headerTop}>
          <button className={classes.backButton} onClick={handleCancel}>
            ← Back to Templates
          </button>
        </div>
        <h1 className={classes.title}>Edit Template ({template.category})</h1>
        <p className={classes.subtitle}>
          Update and configure your banner template
        </p>
      </div>

      {/* Head Image Upload Section */}
      <div className={classes.templateCard}>
        <div className={classes.cardHeader}>
          <h3 className={classes.cardTitle}>Head Image</h3>
        </div>
        
        <div className={classes.uploadSection}>
          <label className={classes.fieldLabel}>Upload Head Image *</label>
          <div className={classes.uploadZone}>
            {headImagePreview ? (
              <div className={classes.imagePreview}>
                <img
                  src={headImagePreview}
                  alt="Head preview"
                  className={classes.previewImage}
                />
                <button
                  className={classes.changeImageButton}
                  onClick={() => headImageInputRef.current?.click()}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div
                className={classes.dragDropZone}
                onClick={() => headImageInputRef.current?.click()}
              >
                <div className={classes.uploadIcon}>📁</div>
                <p className={classes.uploadText}>
                  Click to upload or drag and drop
                </p>
                <p className={classes.uploadHint}>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
            <input
              ref={headImageInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleHeadImageUpload(file);
                }
              }}
              className={classes.hiddenInput}
            />
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <BannerTemplates
        templates={templates}
        onTemplatesChange={handleTemplatesChange}
        templateType="banner"
        offerTypes={offerTypes}
        buttonTextOptions={buttonTextOptions}
      />

      {/* Action Buttons */}
      <div className={classes.actionButtons}>
        <button
          className={classes.cancelButton}
          onClick={handleCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          className={classes.saveButton}
          onClick={handleSaveTemplates}
          disabled={isSaving}
        >
          {isSaving ? 'Updating...' : 'Update Template'}
        </button>
      </div>

      <Toast
        isVisible={showSuccessToast}
        type="success"
        title="Template Updated Successfully!"
        message="Your banner template has been updated and saved."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default EditBanner;

