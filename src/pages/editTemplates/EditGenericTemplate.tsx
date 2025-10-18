import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateEditing } from "../../hooks/useTemplateEditing";
import Toast from "../../components/UI/Toast";

const EditGenericTemplate: React.FC = () => {
  // Get template ID and category from URL
  const getTemplateIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };

  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Template';
  };

  const templateId = getTemplateIdFromURL();
  const category = getCategoryFromURL();
  
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

  // Default categories and options
  const defaultCategories = [
    "Mega Sale",
    "Flash Sale",
    "Limited Time Offer",
    "Special Deal",
    "Exclusive Offer",
    "Grand Sale",
    "Festival Sale",
    "Seasonal Offer",
    "Clearance Sale",
    "Bulk Discount",
    "Package Deal",
    "Combo Offer",
    "Buy One Get One",
    "Free Gift",
    "Lucky Draw",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  // Determine template type based on category
  const getTemplateType = (category: string): 'story' | 'banner' => {
    const bannerCategories = ["Banner 1", "Banner 2", "Buttons"];
    return bannerCategories.includes(category) ? 'banner' : 'story';
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
    <div>
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
      
      <CommonTemplates
        category={template.category || category}
        templateType={getTemplateType(template.category || category)}
        storyCategories={defaultCategories}
        positionOptions={positionOptions}
        showTitleBackgroundImage={false}
        showLayeredToggle={category === "Bonanza Promotions" || category === "Income Promotions" || category === "Greetings"}
        isEditMode={true}
        initialData={template}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isSaving}
      />
      
      <Toast
        isVisible={showSuccessToast}
        type="success"
        title="Template Updated Successfully!"
        message={`Your ${category.toLowerCase()} template has been updated and saved.`}
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default EditGenericTemplate;

