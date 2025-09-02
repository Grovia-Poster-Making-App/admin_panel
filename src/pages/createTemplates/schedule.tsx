import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const Schedule: React.FC = () => {
  // Get category from URL or default to "Schedule"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Schedule';
  };

  const scheduleCategories = [
    "Daily Schedule",
    "Weekly Plan",
    "Monthly Calendar",
    "Event Schedule",
    "Meeting Times",
    "Appointment Slots",
    "Training Schedule",
    "Work Hours",
    "Shift Schedule",
    "Deadline Reminder",
    "Project Timeline",
    "Conference Schedule",
    "Workshop Times",
    "Seminar Schedule",
    "Office Hours",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving schedule templates:", formData);
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
      storyCategories={scheduleCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default Schedule;
