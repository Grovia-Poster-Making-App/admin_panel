import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const Schedule: React.FC = () => {
  const { isLoading, error, debugFormData, uploadProgress, uploadStatus, showSuccessToast, handleSuccessToastClose, getCategoryFromURL, handleSave, handleCancel } = useTemplateCreation('story');

  const scheduleCategories = [
    "Daily Schedule",
    "Weekly Plan",
    "Monthly Calendar",
    "Event Schedule",
    "Meeting Times",
    "Appointment Slots",
    "Training Schedule",
    "Work Hours",
    "Shift Schedule",
    "Deadline Reminder",
    "Project Timeline",
    "Conference Schedule",
    "Workshop Times",
    "Seminar Schedule",
    "Office Hours",
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
        storyCategories={scheduleCategories}
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
        message="Your schedule template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default Schedule;
