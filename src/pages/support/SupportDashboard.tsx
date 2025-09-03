import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './SupportDashboard.module.scss';

interface SupportStats {
  totalOpenTickets: number;
  pendingTickets: number;
  resolvedTickets: number;
  totalTickets: number;
}

interface TopUser {
  id: string;
  name: string;
  email: string;
  ticketCount: number;
  lastTicketDate: string;
  avatar: string;
}

interface RecentActivity {
  id: string;
  type: 'ticket_created' | 'ticket_resolved' | 'ticket_assigned';
  user: string;
  ticketId: string;
  timestamp: string;
  description: string;
}

const SupportDashboard: React.FC = () => {
  // Dummy support statistics
  const supportStats: SupportStats = useMemo(() => ({
    totalOpenTickets: 47,
    pendingTickets: 23,
    resolvedTickets: 156,
    totalTickets: 203
  }), []);

  // Dummy top users with repeated issues
  const topUsers: TopUser[] = useMemo(() => [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      ticketCount: 8,
      lastTicketDate: '2024-01-15',
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      ticketCount: 6,
      lastTicketDate: '2024-01-14',
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily@example.com',
      ticketCount: 5,
      lastTicketDate: '2024-01-13',
      avatar: 'ED'
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david@example.com',
      ticketCount: 4,
      lastTicketDate: '2024-01-12',
      avatar: 'DW'
    },
    {
      id: '5',
      name: 'Lisa Brown',
      email: 'lisa@example.com',
      ticketCount: 4,
      lastTicketDate: '2024-01-11',
      avatar: 'LB'
    }
  ], []);

  // Dummy recent activity
  const recentActivity: RecentActivity[] = useMemo(() => [
    {
      id: '1',
      type: 'ticket_created',
      user: 'John Doe',
      ticketId: 'TKT-2024-001',
      timestamp: '2024-01-15 14:30:00',
      description: 'Created new technical support ticket'
    },
    {
      id: '2',
      type: 'ticket_resolved',
      user: 'Jane Smith',
      ticketId: 'TKT-2024-002',
      timestamp: '2024-01-15 13:45:00',
      description: 'Resolved payment issue ticket'
    },
    {
      id: '3',
      type: 'ticket_assigned',
      user: 'Mike Johnson',
      ticketId: 'TKT-2024-003',
      timestamp: '2024-01-15 12:20:00',
      description: 'Assigned to admin team'
    },
    {
      id: '4',
      type: 'ticket_created',
      user: 'Sarah Wilson',
      ticketId: 'TKT-2024-004',
      timestamp: '2024-01-15 11:15:00',
      description: 'Created referral support ticket'
    },
    {
      id: '5',
      type: 'ticket_resolved',
      user: 'David Brown',
      ticketId: 'TKT-2024-005',
      timestamp: '2024-01-15 10:30:00',
      description: 'Resolved general inquiry ticket'
    }
  ], []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ticket_created':
        return 'material-symbols:add-circle';
      case 'ticket_resolved':
        return 'material-symbols:check-circle';
      case 'ticket_assigned':
        return 'material-symbols:assignment';
      default:
        return 'material-symbols:help';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'ticket_created':
        return styles.info;
      case 'ticket_resolved':
        return styles.success;
      case 'ticket_assigned':
        return styles.warning;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.supportDashboard}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Support Dashboard</h2>
        <p className={styles.subtitle}>Monitor and manage user support tickets</p>
      </div>

      {/* Key Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:support-agent" />
          </div>
          <div className={styles.statContent}>
            <h3>Total Open Tickets</h3>
            <p className={styles.statValue}>{supportStats.totalOpenTickets}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-up" />
              +12% this week
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:pending" />
          </div>
          <div className={styles.statContent}>
            <h3>Pending Tickets</h3>
            <p className={styles.statValue}>{supportStats.pendingTickets}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-down" />
              -8% this week
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:check-circle" />
          </div>
          <div className={styles.statContent}>
            <h3>Resolved Tickets</h3>
            <p className={styles.statValue}>{supportStats.resolvedTickets}</p>
            <span className={styles.statChange}>
              <Icon icon="material-symbols:trending-up" />
              +15% this week
            </span>
          </div>
        </div>


      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Top Users with Repeated Issues */}
        <div className={styles.topUsersCard}>
          <div className={styles.cardHeader}>
            <h3>Top Users with Repeated Issues</h3>
            <button className={styles.viewAllButton}>
              View All
              <Icon icon="material-symbols:arrow-forward" />
            </button>
          </div>
          <div className={styles.topUsersList}>
            {topUsers.map((user, index) => (
              <div key={user.id} className={styles.userItem}>
                <div className={styles.rankBadge}>
                  #{index + 1}
                </div>
                <div className={styles.userAvatar}>
                  {user.avatar}
                </div>
                <div className={styles.userInfo}>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <div className={styles.userStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{user.ticketCount}</span>
                    <span className={styles.statLabel}>Tickets</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statDate}>{user.lastTicketDate}</span>
                    <span className={styles.statLabel}>Last Ticket</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.recentActivityCard}>
          <div className={styles.cardHeader}>
            <h3>Recent Activity</h3>
            <button className={styles.viewAllButton}>
              View All
              <Icon icon="material-symbols:arrow-forward" />
            </button>
          </div>
          <div className={styles.activityList}>
            {recentActivity.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={`${styles.activityIcon} ${getActivityColor(activity.type)}`}>
                  <Icon icon={getActivityIcon(activity.type)} />
                </div>
                <div className={styles.activityContent}>
                  <div className={styles.activityHeader}>
                    <span className={styles.activityUser}>{activity.user}</span>
                    <span className={styles.activityTicket}>{activity.ticketId}</span>
                  </div>
                  <div className={styles.activityDetails}>
                    <span className={styles.activityDescription}>{activity.description}</span>
                    <span className={styles.activityTime}>{activity.timestamp}</span>
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

export default SupportDashboard;
