import React, { useState, useRef } from "react";
import classes from "../../pages/createTemplates/Banner.module.scss";
import BannerTemplates, { StoryTemplate, BannerTemplate } from "./bannerTemplates";

interface CommonTemplatesForm {
  headImage: File | null;
  headImagePreview: string;
  showTitleBackgroundImage: boolean;
  titleBackgroundImage: File | null;
  titleBackgroundImagePreview: string;
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
}) => {
  const [selectedCategory] = useState(category);
  const [formData, setFormData] = useState<CommonTemplatesForm>({
    headImage: null,
    headImagePreview: "",
    showTitleBackgroundImage: showTitleBackgroundImage,
    titleBackgroundImage: null,
    titleBackgroundImagePreview: "",
    templates: templateType === 'story' ? [
      {
        id: "1",
        image: null,
        imagePreview: "",
        price: "",
        category: "",
        profileImagePosition: "",
        userDetailPosition: "",
        expirationDate: "",
      } as StoryTemplate
    ] : [
      {
        id: "1",
        image: null,
        imagePreview: "",
        url: "",
        title: "",
        shortDescription: "",
        longDescription: "",
        expiresAt: "",
        isVisible: true,
        offerType: "",
        discount: "",
        termsForOffer: "",
        buttonText: "Pay Now",
        isBannerClickable: true,
      } as BannerTemplate
    ],
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
        <h1 className={classes.title}>Create Template ({selectedCategory})</h1>
        <p className={classes.subtitle}>
          Design and configure {selectedCategory.toLowerCase()} templates for your campaigns
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
            {formData.headImagePreview ? (
              <div className={classes.imagePreview}>
                <img
                  src={formData.headImagePreview}
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
                    <button
                      className={classes.changeImageButton}
                      onClick={() => titleBackgroundImageInputRef.current?.click()}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div
                    className={classes.dragDropZone}
                    onClick={() => titleBackgroundImageInputRef.current?.click()}
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

      {/* Templates Section */}
      <BannerTemplates
        templates={formData.templates}
        onTemplatesChange={handleTemplatesChange}
        templateType={templateType}
        storyCategories={storyCategories}
        offerTypes={offerTypes}
        buttonTextOptions={buttonTextOptions}
        positionOptions={positionOptions}
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
        >
          Save Templates
        </button>
      </div>
    </div>
  );
};

export default CommonTemplates;
