import React, { useState, useRef } from "react";
import classes from "./Banner.module.scss";
import BannerTemplates, { BannerTemplate } from "../../components/templates/bannerTemplates";



const Banner: React.FC = () => {
  // Get category from URL or default to "Banner"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Banner';
  };

  const [selectedCategory] = useState(getCategoryFromURL());
  const [headImage, setHeadImage] = useState<File | null>(null);
  const [headImagePreview, setHeadImagePreview] = useState<string>("");
  const [templates, setTemplates] = useState<BannerTemplate[]>([
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
    },
  ]);

  const headImageInputRef = useRef<HTMLInputElement>(null);

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

  const handleTemplatesChange = (templates: any[]) => {
    setTemplates(templates as BannerTemplate[]);
  };

  const handleSaveTemplates = () => {
    const bannerData = {
      headImage,
      headImagePreview,
      templates,
    };
    console.log("Saving banner templates:", bannerData);
    // Add save logic here
  };

  const handleCancel = () => {
    // Add cancel logic here
    console.log("Cancelled");
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

export default Banner;
