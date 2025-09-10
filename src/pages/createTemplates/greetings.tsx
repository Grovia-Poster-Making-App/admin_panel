import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const Greetings: React.FC = () => {
  const { isLoading, error, debugFormData, uploadProgress, uploadStatus, showSuccessToast, handleSuccessToastClose, getCategoryFromURL, handleSave, handleCancel } = useTemplateCreation('story');

  const greetingCategories = [
    "Good Morning",
    "Good Afternoon",
    "Good Evening",
    "Welcome",
    "Hello",
    "Hi There",
    "Greetings",
    "Nice to Meet You",
    "Pleasure to Meet",
    "How Are You",
    "Hope You're Well",
    "Have a Great Day",
    "Enjoy Your Day",
    "Take Care",
    "Best Wishes",
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
        storyCategories={greetingCategories}
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
        message="Your greetings template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default Greetings;
