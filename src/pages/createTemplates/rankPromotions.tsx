import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const RankPromotions: React.FC = () => {
  // Get category from URL or default to "Rank Promotions"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Rank Promotions';
  };

  const rankCategories = [
    "Bronze Rank",
    "Silver Rank",
    "Gold Rank",
    "Platinum Rank",
    "Diamond Rank",
    "Master Rank",
    "Grandmaster Rank",
    "Champion Rank",
    "Legend Rank",
    "Elite Rank",
    "VIP Rank",
    "Premium Rank",
    "Executive Rank",
    "Director Rank",
    "Manager Rank",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving rank promotions templates:", formData);
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
      storyCategories={rankCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default RankPromotions;
