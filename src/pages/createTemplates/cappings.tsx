import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const Cappings: React.FC = () => {
  // Get category from URL or default to "Capping"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Capping';
  };

  const cappingCategories = [
    "Sales Cap",
    "Performance Cap",
    "Target Cap",
    "Goal Cap",
    "Limit Cap",
    "Maximum Cap",
    "Threshold Cap",
    "Quota Cap",
    "Budget Cap",
    "Time Cap",
    "Resource Cap",
    "Capacity Cap",
    "Volume Cap",
    "Revenue Cap",
    "Achievement Cap",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving cappings templates:", formData);
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
      storyCategories={cappingCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default Cappings;
