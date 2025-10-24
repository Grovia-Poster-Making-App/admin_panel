import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateEditing } from "../../hooks/useTemplateEditing";
import Toast from "../../components/UI/Toast";

const EditCustomMeetingsWithoutPic: React.FC = () => {
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

  const customMeetingCategories = [
    "Custom Team Meeting",
    "Special Event Meeting",
    "Unique Discussion",
    "Personalized Session",
    "Tailored Workshop",
    "Custom Training",
    "Bespoke Conference",
    "Individual Meeting",
    "Specialized Session",
    "Customized Review",
    "Personal Planning",
    "Unique Brainstorming",
    "Custom Strategy",
    "Tailored Discussion",
    "Specialized Call",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

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
        category={template.category}
        templateType="story"
        storyCategories={customMeetingCategories}
        positionOptions={positionOptions}
        showTitleBackgroundImage={false}
        showLayeredToggle={false}
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
        message="Your custom meetings without picture template has been updated and saved."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default EditCustomMeetingsWithoutPic;

