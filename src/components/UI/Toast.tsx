import React, { useEffect } from 'react';
import classes from './Toast.module.scss';

interface ToastProps {
  isVisible: boolean;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  isVisible,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '✓';
    }
  };

  return (
    <div className={`${classes.toast} ${classes[type]}`}>
      <div className={classes.toastContent}>
        <div className={classes.iconContainer}>
          <div className={classes.icon}>{getIcon()}</div>
        </div>
        <div className={classes.textContent}>
          <h4 className={classes.title}>{title}</h4>
          <p className={classes.message}>{message}</p>
        </div>
        <button className={classes.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={classes.progressBar}>
        <div 
          className={classes.progressFill} 
          style={{ 
            animation: `progress ${duration}ms linear forwards` 
          }}
        />
      </div>
    </div>
  );
};

export default Toast;
