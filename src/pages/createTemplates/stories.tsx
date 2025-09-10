import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const Stories: React.FC = () => {
  const { isLoading, error, debugFormData, uploadProgress, uploadStatus, showSuccessToast, handleSuccessToastClose, getCategoryFromURL, handleSave, handleCancel } = useTemplateCreation('story');

  const storyCategories = [
    "Birthday",
    "Promotion",
    "New Car",
    "Wedding",
    "Anniversary",
    "Graduation",
    "Holiday",
    "Sale",
    "Event",
    "Product Launch",
    "Seasonal",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];


  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
          Error: {error}
        </div>
      )}
      
      {uploadStatus && (
        <div style={{ 
          marginBottom: '10px', 
          padding: '10px', 
          backgroundColor: '#f0f8ff', 
          border: '1px solid #007bff', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '5px' }}>{uploadStatus}</div>
          {uploadProgress > 0 && (
            <div style={{ 
              width: '100%', 
              backgroundColor: '#e0e0e0', 
              borderRadius: '10px', 
              overflow: 'hidden' 
            }}>
              <div style={{ 
                width: `${uploadProgress}%`, 
                height: '20px', 
                backgroundColor: '#007bff', 
                transition: 'width 0.3s ease' 
              }}></div>
            </div>
          )}
        </div>
      )}
      
      <CommonTemplates
        category={getCategoryFromURL()}
        templateType="story"
        storyCategories={storyCategories}
        positionOptions={positionOptions}
        onSave={handleSave}
        onCancel={handleCancel}
        showTitleBackgroundImage={true}
        isLoading={isLoading}
      />
      
      <Toast
        isVisible={showSuccessToast}
        type="success"
        title="Template Saved Successfully!"
        message="Your story template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default Stories;
