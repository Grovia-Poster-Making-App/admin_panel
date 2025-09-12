import React, { useRef } from "react";
import classes from "../../pages/createTemplates/Banner.module.scss";

// Generic template interface that can be extended
interface BaseTemplate {
  id: string;
  image: File | null;
  imagePreview: string;
}

// Story template interface
interface StoryTemplate extends BaseTemplate {
  title: string;
  subtitle: string;
  price: string;
  category: string;
  profileImagePosition: string;
  userDetailPosition: string;
  expirationDate: string;
  eventDate: string;
}

// Banner template interface
interface BannerTemplate extends BaseTemplate {
  url: string;
  title: string;
  subtitle: string;
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

// Union type for all template types
type Template = StoryTemplate | BannerTemplate;

// Props interface for the component
interface BannerTemplatesProps {
  templates: Template[];
  onTemplatesChange: (templates: Template[]) => void;
  templateType: 'story' | 'banner';
  storyCategories?: string[];
  offerTypes?: string[];
  buttonTextOptions?: string[];
  positionOptions?: string[];
}

const BannerTemplates: React.FC<BannerTemplatesProps> = ({
  templates,
  onTemplatesChange,
  templateType,
  storyCategories = [],
  offerTypes = [],
  buttonTextOptions = [],
  positionOptions = []
}) => {
  const templateImageInputRef = useRef<HTMLInputElement>(null);

  const handleTemplateImageUpload = (file: File, templateId: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedTemplates = templates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              image: file,
              imagePreview: e.target?.result as string,
            }
          : template
      );
      onTemplatesChange(updatedTemplates);
    };
    reader.readAsDataURL(file);
  };



  const handleTemplateInputChange = (
    templateId: string,
    field: string,
    value: string | boolean
  ) => {
    const updatedTemplates = templates.map((template) =>
      template.id === templateId
        ? { ...template, [field]: value }
        : template
    );
    onTemplatesChange(updatedTemplates);
  };

  const addMoreTemplate = () => {
    const newTemplate: Template = templateType !== 'banner' 
              ? {
          id: Date.now().toString(),
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
        } as StoryTemplate
      : {
          id: Date.now().toString(),
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
        } as BannerTemplate;
    
    onTemplatesChange([...templates, newTemplate]);
  };

  const removeTemplate = (templateId: string) => {
    if (templates.length > 1) {
      onTemplatesChange(templates.filter((template) => template.id !== templateId));
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const renderStoryTemplateFields = (template: StoryTemplate, index: number) => (
    <>
      {/* Template Image Upload Section */}
      <div className={classes.uploadSection}>
        <label className={classes.fieldLabel}>Template Image *</label>
        <div className={classes.uploadZone}>
          {template.imagePreview ? (
            <div className={classes.imagePreview}>
              <img
                src={template.imagePreview}
                alt="Template preview"
                className={classes.previewImage}
              />
              <button
                className={classes.changeImageButton}
                onClick={() => templateImageInputRef.current?.click()}
              >
                Change Image
              </button>
            </div>
          ) : (
            <div
              className={classes.dragDropZone}
              onClick={() => templateImageInputRef.current?.click()}
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
            ref={templateImageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleTemplateImageUpload(file, template.id);
              }
            }}
            className={classes.hiddenInput}
          />
        </div>
      </div>



      {/* Single Line Input Fields */}
      <div className={classes.singleLineInputs}>
        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Title *</label>
          <input
            type="text"
            placeholder="Enter template title"
            value={template.title}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "title", e.target.value)
            }
            className={classes.input}
          />
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Subtitle *</label>
          <input
            type="text"
            placeholder="Enter template subtitle"
            value={template.subtitle}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "subtitle", e.target.value)
            }
            className={classes.input}
          />
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Price of Template *</label>
          <input
            type="number"
            placeholder="Enter price (e.g., 99.99)"
            value={template.price}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "price", e.target.value)
            }
            className={classes.input}
            min="0"
            step="0.01"
          />
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Category of Stories *</label>
          <select
            value={template.category}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "category", e.target.value)
            }
            className={classes.select}
          >
            <option value="">Select category</option>
            {storyCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Position of Profile Image *</label>
          <select
            value={template.profileImagePosition}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "profileImagePosition", e.target.value)
            }
            className={classes.select}
          >
            <option value="">Select position</option>
            {positionOptions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>User Detail Position *</label>
          <select
            value={template.userDetailPosition}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "userDetailPosition", e.target.value)
            }
            className={classes.select}
          >
            <option value="">Select position</option>
            {positionOptions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Story Expiration Date *</label>
          <input
            type="date"
            value={template.expirationDate}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "expirationDate", e.target.value)
            }
            className={classes.input}
            onFocus={(e) => {
              const input = e.target as any;
              if (input.showPicker && typeof input.showPicker === 'function') {
                input.showPicker();
              }
            }}
          />
          {template.expirationDate && (
            <span className={classes.dateFormat}>
              Format: {formatDate(template.expirationDate)}
            </span>
          )}
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Event Date *</label>
          <input
            type="date"
            value={template.eventDate}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "eventDate", e.target.value)
            }
            className={classes.input}
            onFocus={(e) => {
              const input = e.target as any;
              if (input.showPicker && typeof input.showPicker === 'function') {
                input.showPicker();
              }
            }}
          />
          {template.eventDate && (
            <span className={classes.dateFormat}>
              Format: {formatDate(template.eventDate)}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const renderBannerTemplateFields = (template: BannerTemplate, index: number) => (
    <>
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
                onClick={() => templateImageInputRef.current?.click()}
              >
                Change Image
              </button>
            </div>
          ) : (
            <div
              className={classes.dragDropZone}
              onClick={() => templateImageInputRef.current?.click()}
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
            ref={templateImageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleTemplateImageUpload(file, template.id);
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
              handleTemplateInputChange(template.id, "url", e.target.value)
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
              handleTemplateInputChange(template.id, "title", e.target.value)
            }
            className={classes.input}
          />
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Subtitle *</label>
          <input
            type="text"
            placeholder="Enter template subtitle"
            value={template.subtitle}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "subtitle", e.target.value)
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
              handleTemplateInputChange(template.id, "shortDescription", e.target.value)
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
              handleTemplateInputChange(template.id, "expiresAt", e.target.value)
            }
            className={classes.input}
            onFocus={(e) => {
              const input = e.target as any;
              if (input.showPicker && typeof input.showPicker === 'function') {
                input.showPicker();
              }
            }}
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
              handleTemplateInputChange(template.id, "offerType", e.target.value)
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
              handleTemplateInputChange(template.id, "discount", e.target.value)
            }
            className={classes.input}
          />
        </div>

        <div className={classes.formField}>
          <label className={classes.fieldLabel}>Button Text</label>
          <select
            value={template.buttonText}
            onChange={(e) =>
              handleTemplateInputChange(template.id, "buttonText", e.target.value)
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
              handleTemplateInputChange(template.id, "longDescription", e.target.value)
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
              handleTemplateInputChange(template.id, "termsForOffer", e.target.value)
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
                  handleTemplateInputChange(template.id, "isVisible", e.target.checked)
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
                  handleTemplateInputChange(
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
    </>
  );

  return (
    <>
      {/* Templates Section */}
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
            {templateType === 'story' 
              ? renderStoryTemplateFields(template as StoryTemplate, index)
              : renderBannerTemplateFields(template as BannerTemplate, index)
            }
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
          Add Template
        </button>
      </div>
    </>
  );
};

export default BannerTemplates;
export type { StoryTemplate, BannerTemplate, Template };
