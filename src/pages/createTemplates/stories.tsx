import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const Stories: React.FC = () => {
  // Get category from URL or default to "Stories"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Stories';
  };

  const storyCategories = [
    "Birthday",
    "Promotion",
    "New Car",
    "Wedding",
    "Anniversary",
    "Graduation",
    "Holiday",
    "Sale",
    "Event",
    "Product Launch",
    "Seasonal",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving stories templates:", formData);
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
      storyCategories={storyCategories}
      positionOptions={positionOptions}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default Stories;
