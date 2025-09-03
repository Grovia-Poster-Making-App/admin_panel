import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './WalletImpact.module.scss';

interface WalletImpactData {
  totalCreditsAwarded: number;
  monthlyCredits: number;
  averageCreditPerReferral: number;
  topCreditsMonth: {
    month: string;
    amount: number;
  };
  creditsByStatus: {
    pending: number;
    approved: number;
    completed: number;
  };
  recentCredits: {
    id: string;
    user: string;
    amount: number;
    date: string;
    status: 'Pending' | 'Approved' | 'Completed';
  }[];
}

const WalletImpact: React.FC = () => {
  // Dummy wallet impact data
  const walletImpactData: WalletImpactData = useMemo(() => ({
    totalCreditsAwarded: 45680,
    monthlyCredits: 3840,
    averageCreditPerReferral: 36.7,
    topCreditsMonth: {
      month: 'December 2024',
      amount: 12450
    },
    creditsByStatus: {
      pending: 1250,
      approved: 8900,
      completed: 35530
    },
    recentCredits: [
      {
        id: '1',
        user: 'Sarah Johnson',
        amount: 50,
        date: '2024-01-15 14:30:00',
        status: 'Completed'
      },
      {
        id: '2',
        user: 'Mike Chen',
        amount: 50,
        date: '2024-01-14 10:15:00',
        status: 'Approved'
      },
      {
        id: '3',
        user: 'Emily Davis',
        amount: 50,
        date: '2024-01-13 16:20:00',
        status: 'Completed'
      },
      {
        id: '4',
        user: 'Lisa Brown',
        amount: 50,
        date: '2024-01-12 09:45:00',
        status: 'Pending'
      },
      {
        id: '5',
        user: 'David Wilson',
        amount: 50,
        date: '2024-01-11 13:10:00',
        status: 'Completed'
      }
    ]
  }), []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'material-symbols:schedule';
      case 'Approved':
        return 'material-symbols:check-circle';
      case 'Completed':
        return 'material-symbols:done';
      default:
        return 'material-symbols:help';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return styles.warning;
      case 'Approved':
        return styles.success;
      case 'Completed':
        return styles.info;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.walletImpact}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Wallet Impact</h2>
        <p className={styles.subtitle}>Track wallet credits awarded from referrals</p>
      </div>

      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Icon icon="material-symbols:account-balance-wallet" />
          </div>
          <div className={styles.metricContent}>
            <h3>Total Credits Awarded</h3>
            <p className={styles.metricValue}>{formatCurrency(walletImpactData.totalCreditsAwarded)}</p>
            <span className={styles.metricChange}>
              <Icon icon="material-symbols:trending-up" />
              +23.4% this month
            </span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Icon icon="material-symbols:calendar-month" />
          </div>
          <div className={styles.metricContent}>
            <h3>Monthly Credits</h3>
            <p className={styles.metricValue}>{formatCurrency(walletImpactData.monthlyCredits)}</p>
            <span className={styles.metricChange}>
              <Icon icon="material-symbols:trending-up" />
              +15.2% vs last month
            </span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Icon icon="material-symbols:analytics" />
          </div>
          <div className={styles.metricContent}>
            <h3>Avg Credit per Referral</h3>
            <p className={styles.metricValue}>{formatCurrency(walletImpactData.averageCreditPerReferral)}</p>
            <span className={styles.metricChange}>
              <Icon icon="material-symbols:trending-up" />
              +2.1% this month
            </span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Icon icon="material-symbols:star" />
          </div>
          <div className={styles.metricContent}>
            <h3>Best Month</h3>
            <p className={styles.metricValue}>{formatCurrency(walletImpactData.topCreditsMonth.amount)}</p>
            <span className={styles.metricChange}>
              <Icon icon="material-symbols:calendar-today" />
              {walletImpactData.topCreditsMonth.month}
            </span>
          </div>
        </div>
      </div>

      {/* Credits Breakdown */}
      <div className={styles.breakdownSection}>
        <div className={styles.breakdownCard}>
          <h3>Credits by Status</h3>
          <div className={styles.statusBreakdown}>
            <div className={styles.statusItem}>
              <div className={styles.statusInfo}>
                <div className={`${styles.statusIndicator} ${styles.pending}`}></div>
                <span className={styles.statusLabel}>Pending</span>
              </div>
              <span className={styles.statusAmount}>{formatCurrency(walletImpactData.creditsByStatus.pending)}</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusInfo}>
                <div className={`${styles.statusIndicator} ${styles.approved}`}></div>
                <span className={styles.statusLabel}>Approved</span>
              </div>
              <span className={styles.statusAmount}>{formatCurrency(walletImpactData.creditsByStatus.approved)}</span>
            </div>
            <div className={styles.statusItem}>
              <div className={styles.statusInfo}>
                <div className={`${styles.statusIndicator} ${styles.completed}`}></div>
                <span className={styles.statusLabel}>Completed</span>
              </div>
              <span className={styles.statusAmount}>{formatCurrency(walletImpactData.creditsByStatus.completed)}</span>
            </div>
          </div>
        </div>

        <div className={styles.recentCreditsCard}>
          <h3>Recent Credits</h3>
          <div className={styles.recentCreditsList}>
            {walletImpactData.recentCredits.map((credit) => (
              <div key={credit.id} className={styles.creditItem}>
                <div className={styles.creditInfo}>
                  <div className={styles.userAvatar}>
                    {credit.user.charAt(0)}
                  </div>
                  <div className={styles.creditDetails}>
                    <div className={styles.userName}>{credit.user}</div>
                    <div className={styles.creditDate}>{credit.date}</div>
                  </div>
                </div>
                <div className={styles.creditAmount}>
                  <span className={styles.amount}>{formatCurrency(credit.amount)}</span>
                  <span className={`${styles.statusBadge} ${getStatusColor(credit.status)}`}>
                    <Icon icon={getStatusIcon(credit.status)} />
                    {credit.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className={styles.impactSummary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <Icon icon="material-symbols:insights" />
          </div>
          <div className={styles.summaryContent}>
            <h3>Referral Program Impact</h3>
            <p>
              Your referral program has successfully awarded <strong>{formatCurrency(walletImpactData.totalCreditsAwarded)}</strong> in wallet credits, 
              with an average of <strong>{formatCurrency(walletImpactData.averageCreditPerReferral)}</strong> per successful referral. 
              This month alone, <strong>{formatCurrency(walletImpactData.monthlyCredits)}</strong> has been distributed to active referrers.
            </p>
            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.statNumber}>1,247</span>
                <span className={styles.statLabel}>Total Referrals</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statNumber}>89</span>
                <span className={styles.statLabel}>Active Referrers</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.statNumber}>78.5%</span>
                <span className={styles.statLabel}>Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletImpact;
