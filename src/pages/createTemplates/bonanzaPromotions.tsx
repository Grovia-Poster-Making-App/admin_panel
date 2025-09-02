import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const BonanzaPromotions: React.FC = () => {
  // Get category from URL or default to "Bonanza Promotions"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Bonanza Promotions';
  };

  const bonanzaCategories = [
    "Mega Sale",
    "Flash Sale",
    "Limited Time Offer",
    "Special Deal",
    "Exclusive Offer",
    "Grand Sale",
    "Festival Sale",
    "Seasonal Offer",
    "Clearance Sale",
    "Bulk Discount",
    "Package Deal",
    "Combo Offer",
    "Buy One Get One",
    "Free Gift",
    "Lucky Draw",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving bonanza promotions templates:", formData);
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
      storyCategories={bonanzaCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default BonanzaPromotions;
