import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './ReferralDashboard.module.scss';

interface ReferralStats {
  totalReferrals: number;
  totalRewards: number;
  activeReferrers: number;
  monthlyGrowth: number;
}

interface TopReferrer {
  id: string;
  name: string;
  email: string;
  referrals: number;
  rewards: number;
  avatar: string;
}



const ReferralDashboard: React.FC = () => {
  // Dummy referral statistics
  const referralStats: ReferralStats = useMemo(() => ({
    totalReferrals: 1247,
    totalRewards: 45680,
    activeReferrers: 89,
    monthlyGrowth: 23.4
  }), []);

  // Dummy top referrers data
  const topReferrers: TopReferrer[] = useMemo(() => [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      referrals: 45,
      rewards: 1620,
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      referrals: 38,
      rewards: 1368,
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily@example.com',
      referrals: 32,
      rewards: 1152,
      avatar: 'ED'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@example.com',
      referrals: 28,
      rewards: 1008,
      avatar: 'DW'
    },
    {
      id: '5',
      name: 'Lisa Brown',
      email: 'lisa@example.com',
      referrals: 25,
      rewards: 900,
      avatar: 'LB'
    }
  ], []);



  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };



  return (
    <div className={styles.referralDashboard}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Referral Dashboard</h2>
        <p className={styles.subtitle}>Track and manage your referral program performance</p>
      </div>

      {/* Key Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:people" />
          </div>
          <div className={styles.statContent}>
            <h3>Total Referrals</h3>
            <p className={styles.statValue}>{referralStats.totalReferrals.toLocaleString()}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-up" />
              +{referralStats.monthlyGrowth}% this month
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:account-balance-wallet" />
          </div>
          <div className={styles.statContent}>
            <h3>Total Rewards</h3>
            <p className={styles.statValue}>{formatCurrency(referralStats.totalRewards)}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-up" />
              +{referralStats.monthlyGrowth}% this month
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:group" />
          </div>
          <div className={styles.statContent}>
            <h3>Active Referrers</h3>
            <p className={styles.statValue}>{referralStats.activeReferrers}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-up" />
              +12% this month
            </span>
          </div>
        </div>


      </div>

      {/* Top Performers */}
      <div className={styles.topReferrersSection}>
        {/* Top Referrers */}
        <div className={styles.topReferrersCard}>
          <div className={styles.cardHeader}>
            <h3>Top Referrers</h3>
            <button className={styles.viewAllButton}>
              View All
              <Icon icon="material-symbols:arrow-forward" />
            </button>
          </div>
          <div className={styles.topReferrersList}>
            {topReferrers.map((referrer, index) => (
              <div key={referrer.id} className={styles.referrerItem}>
                <div className={styles.rankBadge}>
                  #{index + 1}
                </div>
                <div className={styles.referrerAvatar}>
                  {referrer.avatar}
                </div>
                <div className={styles.referrerInfo}>
                  <h4>{referrer.name}</h4>
                  <p>{referrer.email}</p>
                </div>
                <div className={styles.referrerStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{referrer.referrals}</span>
                    <span className={styles.statLabel}>Referrals</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{formatCurrency(referrer.rewards)}</span>
                    <span className={styles.statLabel}>Rewards</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default ReferralDashboard;
