import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

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

  const handleSave = (formData: any) => {
    console.log("Saving achievements templates:", formData);
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
      storyCategories={achievementCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default Achievements;
