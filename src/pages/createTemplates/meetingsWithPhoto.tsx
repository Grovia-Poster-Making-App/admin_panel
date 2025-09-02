import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const MeetingsWithPhoto: React.FC = () => {
  // Get category from URL or default to "Meetings (With Photo)"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Meetings (With Photo)';
  };

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

  const handleSave = (formData: any) => {
    console.log("Saving meetings with photo templates:", formData);
    // Add save logic here - API call, validation, etc.
  };

  const handleCancel = () => {
    console.log("Cancelled");
    // Navigate back to templates page
    window.history.back();
  };

  return (
    <CommonTemplates
      category={getCategoryFromURL()}
      templateType="story"
      storyCategories={meetingCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default MeetingsWithPhoto;
