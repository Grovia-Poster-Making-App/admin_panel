import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import SuccessPopup from "../../components/UI/SuccessPopup";

const Achievements: React.FC = () => {
  // Get category from URL or default to "Achievements"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Achievements';
  };

  const achievementCategories = [
    "Sales Achievement",
    "Performance Milestone",
    "Team Success",
    "Project Completion",
    "Goal Achievement",
    "Award Recognition",
    "Certification Earned",
    "Skill Mastery",
    "Leadership Achievement",
    "Innovation Award",
    "Customer Satisfaction",
    "Quality Excellence",
    "Safety Achievement",
    "Training Completion",
    "Career Milestone",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  // Use the template creation hook
  const {
    isLoading,
    error,
    uploadProgress,
    uploadStatus,
    showSuccessToast,
    handleSuccessToastClose,
    handleSave,
    handleCancel,
  } = useTemplateCreation('story');

  return (
    <>
      <CommonTemplates
        category={getCategoryFromURL()}
        templateType="story"
        storyCategories={achievementCategories}
        positionOptions={positionOptions}
        showTitleBackgroundImage={false}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
      
      {/* Show error message if there's an error */}
      {error && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          background: '#ff4444', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px',
          zIndex: 9999 
        }}>
          Error: {error}
        </div>
      )}
      
      {/* Show upload progress if uploading */}
      {isLoading && uploadStatus && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '20px', 
          background: '#007bff', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '5px',
          zIndex: 9999 
        }}>
          {uploadStatus} {uploadProgress > 0 && `(${uploadProgress}%)`}
        </div>
      )}
      
      {/* Success popup */}
      {showSuccessToast && (
        <SuccessPopup
          isVisible={showSuccessToast}
          title="Success!"
          message="Achievement template saved successfully!"
          onClose={handleSuccessToastClose}
        />
      )}
    </>
  );
};

export default Achievements;
