import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './SupportAnalytics.module.scss';

interface ResolutionTrend {
  month: string;
  resolved: number;
  created: number;
}

interface IssueCategory {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

interface AdminPerformance {
  id: string;
  name: string;
  avatar: string;
  ticketsResolved: number;
  averageResponseTime: number;
  customerSatisfaction: number;
}

const SupportAnalytics: React.FC = () => {
  // Dummy resolution trends data
  const resolutionTrends: ResolutionTrend[] = useMemo(() => [
    { month: 'Jan', resolved: 45, created: 52 },
    { month: 'Feb', resolved: 38, created: 48 },
    { month: 'Mar', resolved: 52, created: 61 },
    { month: 'Apr', resolved: 41, created: 47 },
    { month: 'May', resolved: 58, created: 65 },
    { month: 'Jun', resolved: 47, created: 54 },
    { month: 'Jul', resolved: 63, created: 72 },
    { month: 'Aug', resolved: 55, created: 61 },
    { month: 'Sep', resolved: 49, created: 56 },
    { month: 'Oct', resolved: 67, created: 74 },
    { month: 'Nov', resolved: 59, created: 68 },
    { month: 'Dec', resolved: 72, created: 78 }
  ], []);

  // Dummy issue categories data
  const issueCategories: IssueCategory[] = useMemo(() => [
    { category: 'Technical', count: 89, percentage: 35.2, color: '#3b82f6' },
    { category: 'Payment', count: 67, percentage: 26.5, color: '#22c55e' },
    { category: 'General', count: 54, percentage: 21.3, color: '#9ca3af' },
    { category: 'Referral', count: 43, percentage: 17.0, color: '#f59e0b' }
  ], []);

  // Dummy admin performance data
  const adminPerformance: AdminPerformance[] = useMemo(() => [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      ticketsResolved: 156,
      averageResponseTime: 1.8,
      customerSatisfaction: 4.8
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'MC',
      ticketsResolved: 142,
      averageResponseTime: 2.1,
      customerSatisfaction: 4.6
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: 'ED',
      ticketsResolved: 128,
      averageResponseTime: 2.3,
      customerSatisfaction: 4.7
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: 'DW',
      ticketsResolved: 115,
      averageResponseTime: 2.5,
      customerSatisfaction: 4.5
    }
  ], []);

  const totalTickets = issueCategories.reduce((sum, category) => sum + category.count, 0);
  const maxResolved = Math.max(...resolutionTrends.map(trend => trend.resolved));
  const maxCreated = Math.max(...resolutionTrends.map(trend => trend.created));

  return (
    <div className={styles.supportAnalytics}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Support Analytics</h2>
        <p className={styles.subtitle}>Insights and performance metrics for support operations</p>
      </div>

      {/* Key Metrics */}
      <div className={styles.metricsGrid}>


        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Icon icon="material-symbols:star" />
          </div>
          <div className={styles.metricContent}>
            <h3>Customer Satisfaction</h3>
            <p className={styles.metricValue}>4.7/5</p>
            <span className={styles.metricChange}>
              <Icon icon="material-symbols:trending-up" />
              +0.2 this month
            </span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Icon icon="material-symbols:analytics" />
          </div>
          <div className={styles.metricContent}>
            <h3>Total Tickets</h3>
            <p className={styles.metricValue}>{totalTickets}</p>
            <span className={styles.metricChange}>
              <Icon icon="material-symbols:trending-up" />
              +12% this month
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        {/* Resolution Trends Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Resolution Trends</h3>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.resolvedColor}`}></div>
                <span>Resolved</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendColor} ${styles.createdColor}`}></div>
                <span>Created</span>
              </div>
            </div>
          </div>
          <div className={styles.chartContainer}>
            <div className={styles.chartBars}>
              {resolutionTrends.map((trend) => (
                <div key={trend.month} className={styles.chartBar}>
                  <div className={styles.barGroup}>
                    <div 
                      className={`${styles.bar} ${styles.resolvedBar}`}
                      style={{ height: `${(trend.resolved / maxResolved) * 100}%` }}
                    ></div>
                    <div 
                      className={`${styles.bar} ${styles.createdBar}`}
                      style={{ height: `${(trend.created / maxCreated) * 100}%` }}
                    ></div>
                  </div>
                  <span className={styles.barLabel}>{trend.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issue Categories Chart */}
        <div className={styles.categoriesCard}>
          <div className={styles.cardHeader}>
            <h3>Issue Categories</h3>
            <span className={styles.totalTickets}>Total: {totalTickets} tickets</span>
          </div>
          <div className={styles.categoriesList}>
            {issueCategories.map((category) => (
              <div key={category.category} className={styles.categoryItem}>
                <div className={styles.categoryInfo}>
                  <div 
                    className={styles.categoryColor}
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className={styles.categoryName}>{category.category}</span>
                </div>
                <div className={styles.categoryStats}>
                  <span className={styles.categoryCount}>{category.count}</span>
                  <span className={styles.categoryPercentage}>{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Performance */}
      <div className={styles.adminPerformance}>
        <div className={styles.performanceCard}>
          <div className={styles.cardHeader}>
            <h3>Admin Performance</h3>
            <button className={styles.viewAllButton}>
              View All
              <Icon icon="material-symbols:arrow-forward" />
            </button>
          </div>
          <div className={styles.performanceList}>
            {adminPerformance.map((admin, index) => (
              <div key={admin.id} className={styles.adminItem}>
                <div className={styles.rankBadge}>
                  #{index + 1}
                </div>
                <div className={styles.adminAvatar}>
                  {admin.avatar}
                </div>
                <div className={styles.adminInfo}>
                  <h4>{admin.name}</h4>
                  <div className={styles.adminStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{admin.ticketsResolved}</span>
                      <span className={styles.statLabel}>Tickets Resolved</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{admin.averageResponseTime}h</span>
                      <span className={styles.statLabel}>Avg Response</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{admin.customerSatisfaction}/5</span>
                      <span className={styles.statLabel}>Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Insights */}
      <div className={styles.insightsSummary}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <Icon icon="material-symbols:insights" />
          </div>
          <div className={styles.summaryContent}>
            <h3>Key Insights</h3>
            <div className={styles.insightsList}>
              <div className={styles.insightItem}>
                <Icon icon="material-symbols:check-circle" />
                <span>Technical issues account for 35.2% of all tickets, indicating potential platform improvements needed.</span>
              </div>
              <div className={styles.insightItem}>
                <Icon icon="material-symbols:trending-up" />
                <span>Resolution rate has improved by 5.2% this month, showing effective support processes.</span>
              </div>
              <div className={styles.insightItem}>
                <Icon icon="material-symbols:schedule" />
                <span>Average response time decreased to 2.4 hours, meeting customer expectations.</span>
              </div>
              <div className={styles.insightItem}>
                <Icon icon="material-symbols:star" />
                <span>Customer satisfaction remains high at 4.7/5, reflecting quality support delivery.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAnalytics;
