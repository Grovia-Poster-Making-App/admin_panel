import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import SupportDashboard from './SupportDashboard';
import TicketManagement from './TicketManagement';
import SupportAnalytics from './SupportAnalytics';
import styles from './Support.module.scss';

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tickets' | 'analytics'>('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'material-symbols:dashboard',
      component: <SupportDashboard />
    },
    {
      id: 'tickets',
      label: 'Ticket Management',
      icon: 'material-symbols:assignment',
      component: <TicketManagement />
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'material-symbols:analytics',
      component: <SupportAnalytics />
    }
  ];

  return (
    <section className={styles.supportSection}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Support Center</h2>
          <p className={styles.subtitle}>Manage user support tickets and track performance</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id as 'dashboard' | 'tickets' | 'analytics')}
          >
            <Icon icon={tab.icon} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </section>
  );
};

export default Support;
