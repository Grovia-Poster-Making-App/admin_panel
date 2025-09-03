import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './ReferralDashboard.module.scss';

interface ReferralStats {
  totalReferrals: number;
  totalRewards: number;
  activeReferrers: number;
  conversionRate: number;
  monthlyGrowth: number;
  averageReward: number;
}

interface TopReferrer {
  id: string;
  name: string;
  email: string;
  referrals: number;
  rewards: number;
  avatar: string;
}

interface GrowthData {
  month: string;
  referrals: number;
  rewards: number;
}

const ReferralDashboard: React.FC = () => {
  // Dummy referral statistics
  const referralStats: ReferralStats = useMemo(() => ({
    totalReferrals: 1247,
    totalRewards: 45680,
    activeReferrers: 89,
    conversionRate: 78.5,
    monthlyGrowth: 23.4,
    averageReward: 36.7
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

  // Dummy growth data
  const growthData: GrowthData[] = useMemo(() => [
    { month: 'Jan', referrals: 89, rewards: 3204 },
    { month: 'Feb', referrals: 112, rewards: 4032 },
    { month: 'Mar', referrals: 98, rewards: 3528 },
    { month: 'Apr', referrals: 134, rewards: 4824 },
    { month: 'May', referrals: 156, rewards: 5616 },
    { month: 'Jun', referrals: 178, rewards: 6408 },
    { month: 'Jul', referrals: 145, rewards: 5220 },
    { month: 'Aug', referrals: 167, rewards: 6012 },
    { month: 'Sep', referrals: 189, rewards: 6804 },
    { month: 'Oct', referrals: 203, rewards: 7308 },
    { month: 'Nov', referrals: 187, rewards: 6732 },
    { month: 'Dec', referrals: 1247, rewards: 45680 }
  ], []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
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

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:percent" />
          </div>
          <div className={styles.statContent}>
            <h3>Conversion Rate</h3>
            <p className={styles.statValue}>{formatPercentage(referralStats.conversionRate)}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-up" />
              +5.2% this month
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:analytics" />
          </div>
          <div className={styles.statContent}>
            <h3>Avg Reward</h3>
            <p className={styles.statValue}>{formatCurrency(referralStats.averageReward)}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-up" />
              +2.1% this month
            </span>
          </div>
        </div>
      </div>

      {/* Charts and Top Performers */}
      <div className={styles.chartsSection}>
        {/* Growth Trend Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Referral Growth Trend</h3>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.referralsColor}`}></div>
                <span>Referrals</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.rewardsColor}`}></div>
                <span>Rewards</span>
              </div>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartBars}>
              {growthData.map((data, index) => (
                <div key={data.month} className={styles.chartBar}>
                  <div className={styles.barGroup}>
                    <div 
                      className={`${styles.bar} ${styles.referralsBar}`}
                      style={{ height: `${(data.referrals / 250) * 100}%` }}
                    ></div>
                    <div 
                      className={`${styles.bar} ${styles.rewardsBar}`}
                      style={{ height: `${(data.rewards / 5000) * 100}%` }}
                    ></div>
                  </div>
                  <span className={styles.barLabel}>{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h3>Quick Actions</h3>
        <div className={styles.actionsGrid}>
          <button className={styles.actionButton}>
            <Icon icon="material-symbols:add" />
            <span>Add Referral</span>
          </button>
          <button className={styles.actionButton}>
            <Icon icon="material-symbols:settings" />
            <span>Program Settings</span>
          </button>
          <button className={styles.actionButton}>
            <Icon icon="material-symbols:download" />
            <span>Export Data</span>
          </button>
          <button className={styles.actionButton}>
            <Icon icon="material-symbols:analytics" />
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;
