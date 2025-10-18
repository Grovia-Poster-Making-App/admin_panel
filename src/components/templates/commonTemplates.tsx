import React, { useState, useRef } from "react";
import classes from "../../pages/createTemplates/Banner.module.scss";
import BannerTemplates, { StoryTemplate, BannerTemplate } from "./bannerTemplates";

interface CommonTemplatesForm {
  title: string;
  subtitle: string;
  headImage: File | null;
  headImagePreview: string;
  headImagePinned: boolean;
  showTitleBackgroundImage: boolean;
  titleBackgroundImage: File | null;
  titleBackgroundImagePreview: string;
  templateTypeDropdown?: 'Single Page Edit' | 'Frames Edit' | 'Meetings Edit';
  templateTitleSection?: string;
  templates: StoryTemplate[] | BannerTemplate[];
}

interface CommonTemplatesProps {
  category?: string;
  templateType: 'story' | 'banner';
  storyCategories?: string[];
  offerTypes?: string[];
  buttonTextOptions?: string[];
  positionOptions?: string[];
  onSave?: (formData: CommonTemplatesForm) => void;
  onCancel?: () => void;
  showTitleBackgroundImage?: boolean;
  showSpecialEventFields?: boolean;
  showLayeredToggle?: boolean;
  isLoading?: boolean;
  isEditMode?: boolean;
  initialData?: any;
}

const CommonTemplates: React.FC<CommonTemplatesProps> = ({
  category = 'Templates',
  templateType,
  storyCategories = [],
  offerTypes = [],
  buttonTextOptions = [],
  positionOptions = [],
  onSave,
  onCancel,
  showTitleBackgroundImage = false,
  showSpecialEventFields = false,
  showLayeredToggle = false,
  isLoading = false,
  isEditMode = false,
  initialData = null,
}) => {
  const [selectedCategory] = useState(category);
  const [formData, setFormData] = useState<CommonTemplatesForm>(() => {
    if (isEditMode && initialData) {
      console.log('🔍 Initial data received in CommonTemplates:', initialData);
      console.log('🔍 Templates array:', initialData.templates);
      if (initialData.templates && initialData.templates.length > 0) {
        console.log('🔍 First template data:', initialData.templates[0]);
      }
      
      // Transform API data to form data format
      return {
        title: initialData.title || "",
        subtitle: initialData.subtitle || "",
        headImage: null,
        headImagePreview: initialData.headImageUrl || "",
        headImagePinned: initialData.isPinned || false,
        showTitleBackgroundImage: showTitleBackgroundImage,
        titleBackgroundImage: null,
        titleBackgroundImagePreview: initialData.titleBackgroundImageUrl || "",
        templateTypeDropdown: initialData.templateTypeDropdown || 'Single Page Edit',
        templateTitleSection: initialData.templateTitleSection || "",
        templates: initialData.templates?.map((template: any, index: number) => {
          console.log(`🔍 Mapping template ${index}:`, template);
          console.log(`🔍 Template ${index} expirationDate:`, template.expirationDate);
          console.log(`🔍 Template ${index} eventDate:`, template.eventDate);
          console.log(`🔍 Template ${index} category:`, template.category);
          
          return {
            id: (index + 1).toString(),
            image: null,
            imagePreview: template.imageUrl || "",
            title: template.title || "",
            subtitle: template.subtitle || "",
            price: template.price || "",
            category: template.category || "",
            profileImagePosition: template.profileImagePosition || "",
            userDetailPosition: template.userDetailPosition || "",
            expirationDate: template.expirationDate || "",
            eventDate: template.eventDate || "",
            filterTitle: template.filterTitle || "",
            isLayered: template.isLayered || false,
            secondImage: null,
            secondImagePreview: template.secondImageUrl || "",
            // Banner fields
            url: template.url || "",
            shortDescription: template.shortDescription || "",
            longDescription: template.longDescription || "",
            expiresAt: template.expiresAt || "",
            isVisible: template.isVisible !== undefined ? template.isVisible : true,
            offerType: template.offerType || "",
            discount: template.discount || "",
            termsForOffer: template.termsForOffer || "",
            buttonText: template.buttonText || "Pay Now",
            isBannerClickable: template.isBannerClickable !== undefined ? template.isBannerClickable : true,
          };
        }) || [],
      };
    } else {
      // Default initialization for create mode
      return {
        title: "",
        subtitle: "",
        headImage: null,
        headImagePreview: "",
        headImagePinned: false,
        showTitleBackgroundImage: showTitleBackgroundImage,
        titleBackgroundImage: null,
        titleBackgroundImagePreview: "",
        templateTypeDropdown: 'Single Page Edit',
        templateTitleSection: "",
        templates: templateType === 'story' ? [
          {
            id: "1",
            image: null,
            imagePreview: "",
            title: "",
            subtitle: "",
            price: "",
            category: "",
            profileImagePosition: "",
            userDetailPosition: "",
            expirationDate: "",
            eventDate: "",
            filterTitle: "",
            isLayered: false,
            secondImage: null,
            secondImagePreview: "",
          } as StoryTemplate
        ] : [
          {
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
          } as BannerTemplate
        ],
      };
    }
  });

  const headImageInputRef = useRef<HTMLInputElement>(null);
  const titleBackgroundImageInputRef = useRef<HTMLInputElement>(null);

  const handleHeadImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        headImage: file,
        headImagePreview: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleTitleBackgroundImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        titleBackgroundImage: file,
        titleBackgroundImagePreview: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveHeadImage = () => {
    setFormData((prev) => ({
      ...prev,
      headImage: null,
      headImagePreview: "",
    }));
  };

  const handleRemoveTitleBackgroundImage = () => {
    setFormData((prev) => ({
      ...prev,
      titleBackgroundImage: null,
      titleBackgroundImagePreview: "",
    }));
  };

  const handleTemplatesChange = (templates: any[]) => {
    setFormData((prev) => ({
      ...prev,
      templates: templates,
    }));
  };

  const handleSaveTemplates = () => {
    if (onSave) {
      onSave(formData);
    } else {
      console.log("Saving templates:", formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      console.log("Cancelled");
    }
  };



  return (
    <div className={classes.bannerContainer}>
      <div className={classes.header}>
        <div className={classes.headerTop}>
          <button className={classes.backButton} onClick={() => window.history.back()}>
            ← Back to Templates
          </button>
        </div>
        <h1 className={classes.title}>
          {isEditMode ? `Edit Template (${selectedCategory})` : `Create Template (${selectedCategory})`}
        </h1>
        <p className={classes.subtitle}>
          {isEditMode 
            ? `Edit and update ${selectedCategory.toLowerCase()} template for your campaigns`
            : `Design and configure ${selectedCategory.toLowerCase()} templates for your campaigns`
          }
        </p>
      </div>

      {/* Template Title Section */}
      <div className={classes.templateCard}>
        <div className={classes.cardHeader}>
          <h3 className={classes.cardTitle}>Template Title</h3>
        </div>
        
        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Template Title *</label>
          <input
            type="text"
            placeholder="Enter template title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className={classes.input}
          />
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Template Subtitle *</label>
          <input
            type="text"
            placeholder="Enter template subtitle"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                subtitle: e.target.value,
              }))
            }
            className={classes.input}
          />
        </div>
      </div>

      {/* Head Image Upload Section */}
      <div className={classes.templateCard}>
        <div className={classes.cardHeader}>
          <h3 className={classes.cardTitle}>Head Image</h3>
        </div>
        
        <div className={classes.uploadSection}>
          <label className={classes.fieldLabel}>Upload Head Image *</label>
          <div className={classes.uploadZone}>
            {formData.headImagePreview ? (
              <div className={classes.imagePreview}>
                <img
                  src={formData.headImagePreview}
                  alt="Head preview"
                  className={classes.previewImage}
                />
                <div className={classes.imageActions}>
                  <button
                    className={classes.changeImageButton}
                    onClick={() => headImageInputRef.current?.click()}
                  >
                    Change Image
                  </button>
                  <button
                    className={classes.removeImageButton}
                    onClick={handleRemoveHeadImage}
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={classes.uploadZone}
                onClick={() => headImageInputRef.current?.click()}
              >
                <div className={classes.uploadIcon}>📁</div>
                <p className={classes.uploadText}>
                  Click to upload image
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

        {/* Pin Head Image Toggle */}
        <div className={classes.toggleInputs}>
          <div className={classes.formField}>
            <label className={classes.fieldLabel}>Pin Head Image</label>
            <div className={classes.toggleContainer}>
              <label className={classes.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={formData.headImagePinned}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      headImagePinned: e.target.checked,
                    }))
                  }
                />
                <span className={classes.toggleSlider}></span>
              </label>
              <span className={classes.toggleLabel}>
                {formData.headImagePinned ? "Pinned" : "Not Pinned"}
              </span>
            </div>
            <p className={classes.toggleDescription}>
              When pinned, this head image will remain fixed at the top of the story
            </p>
          </div>
        </div>
      </div>

      {/* Title Background Image Toggle - Only show if showTitleBackgroundImage prop is true */}
      {showTitleBackgroundImage && (
        <div className={classes.templateCard}>
          <div className={classes.cardHeader}>
            <h3 className={classes.cardTitle}>Title Background Image</h3>
          </div>
          
          <div className={classes.toggleInputs}>
            <div className={classes.formField}>
              <label className={classes.fieldLabel}>Add Title Background Image</label>
              <div className={classes.toggleContainer}>
                <label className={classes.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={formData.showTitleBackgroundImage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        showTitleBackgroundImage: e.target.checked,
                      }))
                    }
                  />
                  <span className={classes.toggleSlider}></span>
                </label>
                <span className={classes.toggleLabel}>
                  {formData.showTitleBackgroundImage ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>

          {/* Title Background Image Upload Section - Only when enabled */}
          {formData.showTitleBackgroundImage && (
            <div className={classes.uploadSection}>
              <label className={classes.fieldLabel}>
                Upload Title Background Image <span className={classes.optional}>(Optional)</span>
              </label>
              <div className={classes.uploadZone}>
                {formData.titleBackgroundImagePreview ? (
                  <div className={classes.imagePreview}>
                    <img
                      src={formData.titleBackgroundImagePreview}
                      alt="Title background preview"
                      className={classes.previewImage}
                    />
                    <div className={classes.imageActions}>
                      <button
                        className={classes.changeImageButton}
                        onClick={() => titleBackgroundImageInputRef.current?.click()}
                      >
                        Change Image
                      </button>
                      <button
                        className={classes.removeImageButton}
                        onClick={handleRemoveTitleBackgroundImage}
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={classes.uploadZone}
                    onClick={() => titleBackgroundImageInputRef.current?.click()}
                  >
                    <div className={classes.uploadIcon}>📁</div>
                    <p className={classes.uploadText}>
                      Click to upload image
                    </p>
                    <p className={classes.uploadHint}>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
                <input
                  ref={titleBackgroundImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleTitleBackgroundImageUpload(file);
                    }
                  }}
                  className={classes.hiddenInput}
                />
              </div>
            </div>
          )}
        </div>
      )}


      {/* Special Event Fields - Only show if showSpecialEventFields prop is true */}
      {showSpecialEventFields && (
        <div className={classes.templateCard}>
          <div className={classes.cardHeader}>
            <h3 className={classes.cardTitle}>Template Configuration</h3>
          </div>
          
          <div className={classes.formField}>
            <label className={classes.fieldLabel}>Template Type *</label>
            <select
              value={formData.templateTypeDropdown || 'Single Page Edit'}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  templateTypeDropdown: e.target.value as 'Single Page Edit' | 'Frames Edit' | 'Meetings Edit',
                }))
              }
              className={classes.input}
            >
              <option value="Single Page Edit">Single Page Edit</option>
              <option value="Frames Edit">Frames Edit</option>
              <option value="Meetings Edit">Meetings Edit</option>
            </select>
          </div>

          <div className={classes.formField}>
            <label className={classes.fieldLabel}>Template Title Section *</label>
            <input
              type="text"
              placeholder="Enter template title section"
              value={formData.templateTitleSection || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  templateTitleSection: e.target.value,
                }))
              }
              className={classes.input}
            />
          </div>
        </div>
      )}

      {/* Templates Section */}
      <BannerTemplates
        templates={formData.templates}
        onTemplatesChange={handleTemplatesChange}
        templateType={templateType}
        storyCategories={storyCategories}
        offerTypes={offerTypes}
        buttonTextOptions={buttonTextOptions}
        positionOptions={positionOptions}
        showLayeredToggle={showLayeredToggle}
      />

      {/* Action Buttons */}
      <div className={classes.actionButtons}>
        <button
          className={classes.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={classes.saveButton}
          onClick={handleSaveTemplates}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className={classes.loadingSpinner}>⏳</span>
              {isEditMode ? 'Updating...' : 'Saving...'}
            </>
          ) : (
            isEditMode ? 'Update Template' : 'Save Templates'
          )}
        </button>
      </div>
    </div>
  );
};

export default CommonTemplates;
