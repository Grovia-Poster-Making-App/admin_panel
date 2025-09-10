import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const CustomMeetings: React.FC = () => {
  const { isLoading, error, debugFormData, uploadProgress, uploadStatus, showSuccessToast, handleSuccessToastClose, getCategoryFromURL, handleSave, handleCancel } = useTemplateCreation('story');

  const meetingCategories = [
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


  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
          Error: {error}
        </div>
      )}
      
      
      <CommonTemplates
        category={getCategoryFromURL()}
        templateType="story"
        storyCategories={meetingCategories}
        positionOptions={positionOptions}
        showTitleBackgroundImage={false}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
      
      <Toast
        isVisible={showSuccessToast}
        type="success"
        title="Template Saved Successfully!"
        message="Your custom meetings template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default CustomMeetings;
