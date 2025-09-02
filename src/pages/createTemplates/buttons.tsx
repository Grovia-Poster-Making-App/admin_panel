import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const Buttons: React.FC = () => {
  // Get category from URL or default to "Buttons"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Buttons';
  };

  const buttonCategories = [
    "Call to Action",
    "Download",
    "Subscribe",
    "Learn More",
    "Get Started",
    "Contact Us",
    "Shop Now",
    "Book Now",
    "Sign Up",
    "Login",
    "Submit",
    "Cancel",
    "Save",
    "Delete",
    "Edit",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving button templates:", formData);
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
      storyCategories={buttonCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default Buttons;
