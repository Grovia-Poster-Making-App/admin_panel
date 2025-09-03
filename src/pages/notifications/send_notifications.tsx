import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './SendNotifications.module.scss';

interface NotificationFormData {
  title: string;
  message: string;
  type: 'Info' | 'Alert' | 'Promotion';
  recipientType: 'All Users' | 'Groups' | 'Individual';
  selectedGroups: string[];
  selectedUsers: string[];
}

interface FormErrors {
  title?: string;
  message?: string;
  type?: string;
  recipientType?: string;
}

const SendNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NotificationFormData>({
    title: '',
    message: '',
    type: 'Info',
    recipientType: 'All Users',
    selectedGroups: [],
    selectedUsers: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy data for groups and users
  const groups = [
    'Premium Users',
    'Free Users',
    'Beta Testers',
    'Content Creators',
    'Administrators'
  ];

  const users = [
    'John Doe (john@example.com)',
    'Jane Smith (jane@example.com)',
    'Mike Johnson (mike@example.com)',
    'Sarah Wilson (sarah@example.com)',
    'David Brown (david@example.com)'
  ];

  const handleInputChange = (field: keyof NotificationFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGroupToggle = (group: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGroups: prev.selectedGroups.includes(group)
        ? prev.selectedGroups.filter(g => g !== group)
        : [...prev.selectedGroups, group]
    }));
  };

  const handleUserToggle = (user: string) => {
    setFormData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.includes(user)
        ? prev.selectedUsers.filter(u => u !== user)
        : [...prev.selectedUsers, user]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    if (!formData.recipientType) {
      newErrors.recipientType = 'Recipient type is required';
    }

    if (formData.recipientType === 'Groups' && formData.selectedGroups.length === 0) {
      newErrors.recipientType = 'Please select at least one group';
    }

    if (formData.recipientType === 'Individual' && formData.selectedUsers.length === 0) {
      newErrors.recipientType = 'Please select at least one user';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Notification data:', formData);
      alert('Notification sent successfully!');
      navigate('/notifications');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/notifications');
  };

  const getRecipientCount = () => {
    switch (formData.recipientType) {
      case 'All Users':
        return '1,250 users';
      case 'Groups':
        return `${formData.selectedGroups.length} group(s)`;
      case 'Individual':
        return `${formData.selectedUsers.length} user(s)`;
      default:
        return '0 users';
    }
  };

  return (
    <div className={styles.sendNotifications}>
      <div className={styles.header}>
        <h2 className={styles.title}>Send Notification</h2>
        <button onClick={handleCancel} className={styles.backButton}>
          <Icon icon="material-symbols:arrow-back" />
          Back to Notifications
        </button>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Basic Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
                  placeholder="Enter notification title"
                  className={`${styles.input} ${errors.title ? styles.error : ''}`}
                />
                {errors.title && <span className={styles.errorText}>{errors.title}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as 'Info' | 'Alert' | 'Promotion')}
                  className={`${styles.select} ${errors.type ? styles.error : ''}`}
                >
                  <option value="Info">Info</option>
                  <option value="Alert">Alert</option>
                  <option value="Promotion">Promotion</option>
                </select>
                {errors.type && <span className={styles.errorText}>{errors.type}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Message *</label>
              <textarea
                value={formData.message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('message', e.target.value)}
                placeholder="Enter your notification message"
                rows={4}
                className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>
          </div>

          {/* Recipients */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Recipients</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Recipient Type *</label>
              <div className={styles.radioGroup}>
                {['All Users', 'Groups', 'Individual'].map((type) => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="recipientType"
                      value={type}
                      checked={formData.recipientType === type}
                      onChange={(e) => handleInputChange('recipientType', e.target.value as 'All Users' | 'Groups' | 'Individual')}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>{type}</span>
                  </label>
                ))}
              </div>
              {errors.recipientType && <span className={styles.errorText}>{errors.recipientType}</span>}
            </div>

            {formData.recipientType === 'Groups' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>Select Groups</label>
                <div className={styles.checkboxGroup}>
                  {groups.map((group) => (
                    <label key={group} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.selectedGroups.includes(group)}
                        onChange={() => handleGroupToggle(group)}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxText}>{group}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {formData.recipientType === 'Individual' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>Select Users</label>
                <div className={styles.checkboxGroup}>
                  {users.map((user) => (
                    <label key={user} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.selectedUsers.includes(user)}
                        onChange={() => handleUserToggle(user)}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkboxText}>{user}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.recipientSummary}>
              <Icon icon="material-symbols:people" />
              <span>Will be sent to: <strong>{getRecipientCount()}</strong></span>
            </div>
          </div>





          {/* Actions */}
          <div className={styles.formActions}>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon icon="material-symbols:hourglass-empty" className={styles.spinning} />
                  Sending...
                </>
              ) : (
                <>
                  <Icon icon="material-symbols:send" />
                  Send Now
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendNotifications;
