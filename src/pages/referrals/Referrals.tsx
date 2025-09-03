import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import ReferralDashboard from './ReferralDashboard';
import ReferralRecords from './ReferralRecords';
import WalletImpact from './WalletImpact';
import styles from './Referrals.module.scss';

const Referrals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'records' | 'wallet'>('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'material-symbols:dashboard',
      component: <ReferralDashboard />
    },
    {
      id: 'records',
      label: 'Records',
      icon: 'material-symbols:list',
      component: <ReferralRecords />
    },
    {
      id: 'wallet',
      label: 'Wallet Impact',
      icon: 'material-symbols:account-balance-wallet',
      component: <WalletImpact />
    }
  ];

  return (
    <section className={styles.referralsSection}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Refer & Earn</h2>
          <p className={styles.subtitle}>Manage your referral program and track performance</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id as 'dashboard' | 'records' | 'wallet')}
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

export default Referrals;
