import React, { useState, useRef } from "react";
import classes from "./Banner.module.scss";

interface TemplateForm {
  id: string;
  image: File | null;
  imagePreview: string;
  url: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  expiresAt: string;
  isVisible: boolean;
  offerType: string;
  discount: string;
  termsForOffer: string;
  buttonText: string;
  isBannerClickable: boolean;
}

const Banner: React.FC = () => {
  // Get category from URL or default to "Banner"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Banner';
  };

  const [selectedCategory] = useState(getCategoryFromURL());
  const [templates, setTemplates] = useState<TemplateForm[]>([
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

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (file: File, templateId: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setTemplates((prev) =>
        prev.map((template) =>
          template.id === templateId
            ? {
                ...template,
                image: file,
                imagePreview: e.target?.result as string,
              }
            : template
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (
    templateId: string,
    field: keyof TemplateForm,
    value: string | boolean
  ) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === templateId
          ? { ...template, [field]: value }
          : template
      )
    );
  };

  const addMoreTemplate = () => {
    const newTemplate: TemplateForm = {
      id: Date.now().toString(),
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
    };
    setTemplates((prev) => [...prev, newTemplate]);
  };

  const removeTemplate = (templateId: string) => {
    if (templates.length > 1) {
      setTemplates((prev) => prev.filter((template) => template.id !== templateId));
    }
  };

  const handleSaveTemplates = () => {
    console.log("Saving templates:", templates);
    // Add save logic here
  };

  const handleCancel = () => {
    // Add cancel logic here
    console.log("Cancelled");
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
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

      {templates.map((template, index) => (
        <div key={template.id} className={classes.templateCard}>
          <div className={classes.cardHeader}>
            <h3 className={classes.cardTitle}>
              Template {index + 1}
            </h3>
            {templates.length > 1 && (
              <button
                className={classes.removeButton}
                onClick={() => removeTemplate(template.id)}
                title="Remove Template"
              >
                🗑️
              </button>
            )}
          </div>

          <div className={classes.formGrid}>
            {/* Upload Image Section */}
            <div className={classes.uploadSection}>
              <label className={classes.fieldLabel}>Upload Image *</label>
              <div className={classes.uploadZone}>
                {template.imagePreview ? (
                  <div className={classes.imagePreview}>
                    <img
                      src={template.imagePreview}
                      alt="Preview"
                      className={classes.previewImage}
                    />
                    <button
                      className={classes.changeImageButton}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div
                    className={classes.dragDropZone}
                    onClick={() => fileInputRef.current?.click()}
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
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file, template.id);
                    }
                  }}
                  className={classes.hiddenInput}
                />
              </div>
            </div>

            {/* Single Line Input Fields */}
            <div className={classes.singleLineInputs}>
              <div className={classes.formField}>
                <label className={classes.fieldLabel}>
                  URL <span className={classes.optional}>(Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={template.url}
                  onChange={(e) =>
                    handleInputChange(template.id, "url", e.target.value)
                  }
                  className={classes.input}
                />
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>Title *</label>
                <input
                  type="text"
                  placeholder="Enter template title"
                  value={template.title}
                  onChange={(e) =>
                    handleInputChange(template.id, "title", e.target.value)
                  }
                  className={classes.input}
                />
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>Short Description *</label>
                <input
                  type="text"
                  placeholder="Brief description of the template"
                  value={template.shortDescription}
                  onChange={(e) =>
                    handleInputChange(template.id, "shortDescription", e.target.value)
                  }
                  className={classes.input}
                />
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>Expires At *</label>
                <input
                  type="date"
                  value={template.expiresAt}
                  onChange={(e) =>
                    handleInputChange(template.id, "expiresAt", e.target.value)
                  }
                  className={classes.input}
                />
                {template.expiresAt && (
                  <span className={classes.dateFormat}>
                    Format: {formatDate(template.expiresAt)}
                  </span>
                )}
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>
                  Offer Type <span className={classes.optional}>(Optional)</span>
                </label>
                <select
                  value={template.offerType}
                  onChange={(e) =>
                    handleInputChange(template.id, "offerType", e.target.value)
                  }
                  className={classes.select}
                >
                  <option value="">Select offer type</option>
                  {offerTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>
                  Discount <span className={classes.optional}>(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., 20% or $50"
                  value={template.discount}
                  onChange={(e) =>
                    handleInputChange(template.id, "discount", e.target.value)
                  }
                  className={classes.input}
                />
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>Button Text</label>
                <select
                  value={template.buttonText}
                  onChange={(e) =>
                    handleInputChange(template.id, "buttonText", e.target.value)
                  }
                  className={classes.select}
                >
                  {buttonTextOptions.map((text) => (
                    <option key={text} value={text}>
                      {text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Multi Line Input Fields */}
            <div className={classes.multiLineInputs}>
              <div className={classes.formField}>
                <label className={classes.fieldLabel}>Long Description *</label>
                <textarea
                  placeholder="Detailed description of the template"
                  value={template.longDescription}
                  onChange={(e) =>
                    handleInputChange(template.id, "longDescription", e.target.value)
                  }
                  className={classes.textarea}
                  rows={4}
                />
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>
                  Terms for Offer <span className={classes.optional}>(Optional)</span>
                </label>
                <textarea
                  placeholder="Enter terms and conditions for the offer"
                  value={template.termsForOffer}
                  onChange={(e) =>
                    handleInputChange(template.id, "termsForOffer", e.target.value)
                  }
                  className={classes.textarea}
                  rows={3}
                />
              </div>
            </div>

            {/* Toggle Buttons */}
            <div className={classes.toggleInputs}>
              <div className={classes.formField}>
                <label className={classes.fieldLabel}>Is Visible</label>
                <div className={classes.toggleContainer}>
                  <label className={classes.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={template.isVisible}
                      onChange={(e) =>
                        handleInputChange(template.id, "isVisible", e.target.checked)
                      }
                    />
                    <span className={classes.toggleSlider}></span>
                  </label>
                  <span className={classes.toggleLabel}>
                    {template.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
              </div>

              <div className={classes.formField}>
                <label className={classes.fieldLabel}>Is Banner Clickable</label>
                <div className={classes.toggleContainer}>
                  <label className={classes.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={template.isBannerClickable}
                      onChange={(e) =>
                        handleInputChange(
                          template.id,
                          "isBannerClickable",
                          e.target.checked
                        )
                      }
                    />
                    <span className={classes.toggleSlider}></span>
                  </label>
                  <span className={classes.toggleLabel}>
                    {template.isBannerClickable ? "Clickable" : "Non-clickable"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add More Template Button */}
      <div className={classes.addMoreSection}>
        <button
          className={classes.addMoreButton}
          onClick={addMoreTemplate}
        >
          <span className={classes.buttonIcon}>+</span>
          Add More Template
        </button>
      </div>

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
