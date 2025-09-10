import React from 'react';
import classes from './SuccessPopup.module.scss';

interface SuccessPopupProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isVisible,
  title,
  message,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        <div className={classes.iconContainer}>
          <div className={classes.successIcon}>✓</div>
        </div>
        <div className={classes.content}>
          <h3 className={classes.title}>{title}</h3>
          <p className={classes.message}>{message}</p>
        </div>
        <button className={classes.closeButton} onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
