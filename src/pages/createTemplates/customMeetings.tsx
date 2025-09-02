import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const CustomMeetings: React.FC = () => {
  // Get category from URL or default to "Custom Meetings"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Custom Meetings';
  };

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

  const handleSave = (formData: any) => {
    console.log("Saving custom meetings templates:", formData);
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

export default CustomMeetings;
