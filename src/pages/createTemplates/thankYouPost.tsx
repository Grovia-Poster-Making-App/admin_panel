import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const ThankYouPost: React.FC = () => {
  // Get category from URL or default to "Thank You Post"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Thank You Post';
  };

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

  const handleSave = (formData: any) => {
    console.log("Saving thank you post templates:", formData);
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
      storyCategories={thankYouCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default ThankYouPost;
