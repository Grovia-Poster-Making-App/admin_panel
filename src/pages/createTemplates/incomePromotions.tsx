import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const IncomePromotions: React.FC = () => {
  const { isLoading, error, debugFormData, uploadProgress, uploadStatus, showSuccessToast, handleSuccessToastClose, getCategoryFromURL, handleSave, handleCancel } = useTemplateCreation('story');

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


  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
          Error: {error}
        </div>
      )}
      
      
      <CommonTemplates
        category={getCategoryFromURL()}
        templateType="story"
        storyCategories={incomeCategories}
        positionOptions={positionOptions}
        showTitleBackgroundImage={false}
        showLayeredToggle={true}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
      
      <Toast
        isVisible={showSuccessToast}
        type="success"
        title="Template Saved Successfully!"
        message="Your income promotions template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default IncomePromotions;
