import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const SpecialEvents: React.FC = () => {
  // Get category from URL or default to "Special Events"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Special Events';
  };

  const specialEventCategories = [
    "Birthday Party",
    "Wedding",
    "Anniversary",
    "Graduation",
    "Holiday Celebration",
    "Corporate Event",
    "Product Launch",
    "Conference",
    "Festival",
    "Charity Event",
    "Sports Event",
    "Cultural Event",
    "Religious Event",
    "Seasonal Sale",
    "Custom Event",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving special events templates:", formData);
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
      storyCategories={specialEventCategories}
      positionOptions={positionOptions}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default SpecialEvents;
