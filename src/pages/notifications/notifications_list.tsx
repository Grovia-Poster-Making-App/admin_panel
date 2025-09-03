import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './NotificationsList.module.scss';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'Info' | 'Alert' | 'Promotion';
  recipientType: 'All Users' | 'Groups' | 'Individual';
  recipientCount: number;
  status: 'Sent' | 'Failed';
  sentAt: string;
  deliveryRate: number;
}

const NotificationsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Dummy notifications data
  const notifications: Notification[] = useMemo(() => [
    {
      id: '1',
      title: 'Welcome to Grovia!',
      message: 'Thank you for joining our platform. Explore all the amazing features...',
      type: 'Info',
      recipientType: 'All Users',
      recipientCount: 1250,
      status: 'Sent',
      sentAt: '2024-01-15 10:30:00',
      deliveryRate: 98.5
    },
    {
      id: '2',
      title: 'System Maintenance Alert',
      message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM...',
      type: 'Alert',
      recipientType: 'All Users',
      recipientCount: 1250,
      status: 'Sent',
      sentAt: '2024-01-14 18:00:00',
      deliveryRate: 99.2
    },
    {
      id: '3',
      title: 'New Feature Release',
      message: 'Check out our latest template designs and music library updates...',
      type: 'Promotion',
      recipientType: 'Groups',
      recipientCount: 450,
      status: 'Sent',
      sentAt: '2024-01-13 14:20:00',
      deliveryRate: 95.8
    },
    {
      id: '4',
      title: 'Account Verification',
      message: 'Please verify your email address to continue using our services...',
      type: 'Info',
      recipientType: 'Individual',
      recipientCount: 25,
      status: 'Failed',
      sentAt: '2024-01-12 16:45:00',
      deliveryRate: 0
    },
    {
      id: '5',
      title: 'Premium Subscription Offer',
      message: 'Get 50% off on premium features for the next 7 days...',
      type: 'Promotion',
      recipientType: 'Groups',
      recipientCount: 320,
      status: 'Sent',
      sentAt: '2024-01-11 11:15:00',
      deliveryRate: 97.8
    }
  ], []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || notification.status.toLowerCase() === statusFilter;
      const matchesType = typeFilter === 'all' || notification.type.toLowerCase() === typeFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const notificationDate = new Date(notification.sentAt);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'today':
            matchesDate = daysDiff === 0;
            break;
          case 'week':
            matchesDate = daysDiff <= 7;
            break;
          case 'month':
            matchesDate = daysDiff <= 30;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [notifications, searchTerm, statusFilter, typeFilter, dateFilter]);

  const analytics = useMemo(() => {
    const totalSent = notifications.filter(n => n.status === 'Sent').length;

    return {
      totalSent
    };
  }, [notifications]);

  const handleSendNotification = () => {
    navigate('/notifications/send');
  };

  const handleViewNotification = (id: string) => {
    console.log('View notification:', id);
  };



  const handleDeleteNotification = (id: string) => {
    console.log('Delete notification:', id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'material-symbols:check-circle';
      case 'Failed':
        return 'material-symbols:error';
      default:
        return 'material-symbols:help';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent':
        return styles.success;
      case 'Failed':
        return styles.error;
      default:
        return styles.default;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Info':
        return styles.info;
      case 'Alert':
        return styles.alert;
      case 'Promotion':
        return styles.promotion;
      default:
        return styles.default;
    }
  };

  return (
    <section className={styles.notificationsSection}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Notifications</h2>
        </div>
        <div className={styles.actionSection}>
          <div className={styles.createButtonContainer}>
            <button 
              className={styles.createButton}
              onClick={handleSendNotification}
            >
              <span className={styles.buttonIcon}>+</span>
              Send Notification
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className={styles.analyticsSection}>
        <div className={styles.analyticsCard}>
          <div className={styles.analyticsIcon}>
            <Icon icon="material-symbols:notifications" />
          </div>
          <div className={styles.analyticsContent}>
            <h3>Total Sent</h3>
            <p>{analytics.totalSent}</p>
          </div>
        </div>

      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.filterGroup}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="alert">Alert</option>
            <option value="promotion">Promotion</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Notifications Grid */}
      <div className={styles.notificationsGrid}>
        {filteredNotifications.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📬</div>
            <h3>No notifications found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className={styles.notificationCard}>
              <div className={styles.notificationHeader}>
                <div className={styles.notificationTitle}>
                  <h3>{notification.title}</h3>
                  <span className={`${styles.typeBadge} ${getTypeColor(notification.type)}`}>
                    {notification.type}
                  </span>
                </div>
                <div className={`${styles.statusBadge} ${getStatusColor(notification.status)}`}>
                  <Icon icon={getStatusIcon(notification.status)} />
                  {notification.status}
                </div>
              </div>
              
              <div className={styles.notificationContent}>
                <p className={styles.messagePreview}>
                  {notification.message.length > 100 
                    ? `${notification.message.substring(0, 100)}...` 
                    : notification.message
                  }
                </p>
                
                <div className={styles.notificationMeta}>
                  <div className={styles.metaItem}>
                    <Icon icon="material-symbols:people" />
                    <span>{notification.recipientType} ({notification.recipientCount})</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Icon icon="material-symbols:schedule" />
                    <span>{notification.sentAt}</span>
                  </div>
                </div>


              </div>

              <div className={styles.notificationActions}>
                <button
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  onClick={() => handleViewNotification(notification.id)}
                  title="View Notification"
                >
                  <Icon icon="material-symbols:visibility" />
                </button>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => handleDeleteNotification(notification.id)}
                  title="Delete Notification"
                >
                  <Icon icon="material-symbols:delete" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default NotificationsList;
