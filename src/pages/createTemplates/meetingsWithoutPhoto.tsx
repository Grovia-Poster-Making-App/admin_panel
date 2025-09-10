import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const MeetingsWithoutPhoto: React.FC = () => {
  const { isLoading, error, debugFormData, uploadProgress, uploadStatus, showSuccessToast, handleSuccessToastClose, getCategoryFromURL, handleSave, handleCancel } = useTemplateCreation('story');

  const meetingCategories = [
    "Team Meeting",
    "Board Meeting",
    "Client Meeting",
    "Project Discussion",
    "Strategy Session",
    "Review Meeting",
    "Planning Session",
    "Brainstorming",
    "Training Session",
    "Workshop",
    "Conference Call",
    "Video Conference",
    "One-on-One",
    "Group Discussion",
    "Stand-up Meeting",
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
        message="Your meetings without photo template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default MeetingsWithoutPhoto;
