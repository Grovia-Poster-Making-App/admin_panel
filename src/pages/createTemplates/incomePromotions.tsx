import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";

const IncomePromotions: React.FC = () => {
  // Get category from URL or default to "Income Promotions"
  const getCategoryFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category') || 'Income Promotions';
  };

  const incomeCategories = [
    "Salary Increase",
    "Bonus Announcement",
    "Commission Boost",
    "Profit Sharing",
    "Performance Bonus",
    "Incentive Program",
    "Revenue Share",
    "Earnings Growth",
    "Financial Reward",
    "Monetary Achievement",
    "Income Milestone",
    "Wealth Building",
    "Financial Success",
    "Money Making",
    "Earning Opportunity",
    "Custom",
  ];

  const positionOptions = [
    "Left Side",
    "Right Side",
  ];

  const handleSave = (formData: any) => {
    console.log("Saving income promotions templates:", formData);
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
      storyCategories={incomeCategories}
      positionOptions={positionOptions}
      showTitleBackgroundImage={false}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default IncomePromotions;
