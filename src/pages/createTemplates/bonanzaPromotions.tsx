import React from "react";
import CommonTemplates from "../../components/templates/commonTemplates";
import { useTemplateCreation } from "../../hooks/useTemplateCreation";
import Toast from "../../components/UI/Toast";

const BonanzaPromotions: React.FC = () => {
  const { isLoading, error, debugFormData, uploadProgress, uploadStatus, showSuccessToast, handleSuccessToastClose, getCategoryFromURL, handleSave, handleCancel } = useTemplateCreation('story');

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
        storyCategories={bonanzaCategories}
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
        message="Your bonanza promotions template has been created and saved. You can now use it in your campaigns."
        duration={4000}
        onClose={handleSuccessToastClose}
      />
    </div>
  );
};

export default BonanzaPromotions;
