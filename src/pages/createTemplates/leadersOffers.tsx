import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const LeadersOffers: React.FC = () => {
  // Get category from URL or default to "Leader's Offers"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Leader\'s Offers';
  };

  const leaderCategories = [
    "Executive Package",
    "Management Deal",
    "Leadership Bonus",
    "Director Offer",
    "VP Package",
    "CEO Deal",
    "Senior Management",
    "Team Lead Offer",
    "Supervisor Package",
    "Manager Deal",
    "Head of Department",
    "Regional Manager",
    "Area Manager",
    "Branch Manager",
    "Department Head",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving leader's offers templates:", formData);
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
      storyCategories={leaderCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default LeadersOffers;
