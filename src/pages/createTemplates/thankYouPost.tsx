import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const ThankYouPost: React.FC = () => {
  const { 
    isLoading, 
    error, 
    showSuccessToast, 
    handleSuccessToastClose, 
    getCategoryFromURL, 
    handleSave, 
    handleCancel 
  } = useTemplateCreation('story');

  const thankYouCategories = [
    "Customer Appreciation",
    "Team Thanks",
    "Client Gratitude",
    "Partner Recognition",
    "Employee Appreciation",
    "Service Thanks",
    "Support Acknowledgment",
    "Purchase Thank You",
    "Feedback Thanks",
    "Referral Gratitude",
    "Collaboration Thanks",
    "Mentorship Appreciation",
    "Help Acknowledgment",
    "Support Thanks",
    "General Gratitude",
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
        storyCategories={thankYouCategories}
        positionOptions={positionOptions}
        showTitleBackgroundImage={false}
        showLayeredToggle={true}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
      
      <Toast
        isVisible={showSuccessToast}
        type="success"
        title="Template Saved Successfully!"
        message="Your thank you post template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default ThankYouPost;
