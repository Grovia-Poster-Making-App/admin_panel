import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const Greetings: React.FC = () => {
  // Get category from URL or default to "Greetings"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Greetings';
  };

  const greetingCategories = [
    "Good Morning",
    "Good Afternoon",
    "Good Evening",
    "Welcome",
    "Hello",
    "Hi There",
    "Greetings",
    "Nice to Meet You",
    "Pleasure to Meet",
    "How Are You",
    "Hope You're Well",
    "Have a Great Day",
    "Enjoy Your Day",
    "Take Care",
    "Best Wishes",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving greetings templates:", formData);
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
      storyCategories={greetingCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default Greetings;
