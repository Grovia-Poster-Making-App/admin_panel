import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const MotivationDose: React.FC = () => {
  // Get category from URL or default to "Motivational Dose"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Motivational Dose';
  };

  const motivationCategories = [
    "Daily Motivation",
    "Success Quotes",
    "Goal Setting",
    "Self Improvement",
    "Positive Thinking",
    "Career Growth",
    "Health & Fitness",
    "Financial Success",
    "Leadership",
    "Team Building",
    "Overcoming Challenges",
    "Personal Development",
    "Mindset Shift",
    "Achievement",
    "Inspiration",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving motivational dose templates:", formData);
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
      storyCategories={motivationCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default MotivationDose;
