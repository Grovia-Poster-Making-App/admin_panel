import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './ReferralRecords.module.scss';

interface ReferralRecord {
  id: string;
  referrer: {
    name: string;
    email: string;
    avatar: string;
  };
  referredUser: {
    name: string;
    email: string;
    avatar: string;
  };
  date: string;
  rewardAmount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  referralCode: string;
  conversionDate?: string;
}

const ReferralRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [rewardFilter, setRewardFilter] = useState('all');

  // Dummy referral records data
  const referralRecords: ReferralRecord[] = useMemo(() => [
    {
      id: '1',
      referrer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'SJ'
      },
      referredUser: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'JD'
      },
      date: '2024-01-15 14:30:00',
      rewardAmount: 50,
      status: 'Approved',
      referralCode: 'REF-SJ-001',
      conversionDate: '2024-01-15 16:45:00'
    },
    {
      id: '2',
      referrer: {
        name: 'Mike Chen',
        email: 'mike@example.com',
        avatar: 'MC'
      },
      referredUser: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'JS'
      },
      date: '2024-01-14 10:15:00',
      rewardAmount: 50,
      status: 'Pending',
      referralCode: 'REF-MC-002'
    },
    {
      id: '3',
      referrer: {
        name: 'Emily Davis',
        email: 'emily@example.com',
        avatar: 'ED'
      },
      referredUser: {
        name: 'David Wilson',
        email: 'david@example.com',
        avatar: 'DW'
      },
      date: '2024-01-13 16:20:00',
      rewardAmount: 50,
      status: 'Completed',
      referralCode: 'REF-ED-003',
      conversionDate: '2024-01-13 18:30:00'
    },
    {
      id: '4',
      referrer: {
        name: 'Lisa Brown',
        email: 'lisa@example.com',
        avatar: 'LB'
      },
      referredUser: {
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        avatar: 'MJ'
      },
      date: '2024-01-12 09:45:00',
      rewardAmount: 50,
      status: 'Rejected',
      referralCode: 'REF-LB-004'
    },
    {
      id: '5',
      referrer: {
        name: 'David Wilson',
        email: 'david@example.com',
        avatar: 'DW'
      },
      referredUser: {
        name: 'Sarah Wilson',
        email: 'sarah.w@example.com',
        avatar: 'SW'
      },
      date: '2024-01-11 13:10:00',
      rewardAmount: 50,
      status: 'Approved',
      referralCode: 'REF-DW-005',
      conversionDate: '2024-01-11 15:20:00'
    }
  ], []);

  const filteredRecords = useMemo(() => {
    return referralRecords.filter(record => {
      const matchesSearch = 
        record.referrer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.referrer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.referredUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.referredUser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || record.status.toLowerCase() === statusFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const recordDate = new Date(record.date);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
        
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
      
      let matchesReward = true;
      if (rewardFilter !== 'all') {
        switch (rewardFilter) {
          case 'low':
            matchesReward = record.rewardAmount < 50;
            break;
          case 'medium':
            matchesReward = record.rewardAmount >= 50 && record.rewardAmount < 100;
            break;
          case 'high':
            matchesReward = record.rewardAmount >= 100;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate && matchesReward;
    });
  }, [referralRecords, searchTerm, statusFilter, dateFilter, rewardFilter]);

  const handleApprove = (id: string) => {
    console.log('Approve referral:', id);
  };

  const handleReject = (id: string) => {
    console.log('Reject referral:', id);
  };

  const handleView = (id: string) => {
    console.log('View referral:', id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'material-symbols:schedule';
      case 'Approved':
        return 'material-symbols:check-circle';
      case 'Rejected':
        return 'material-symbols:cancel';
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
      case 'Rejected':
        return styles.error;
      case 'Completed':
        return styles.info;
      default:
        return styles.default;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={styles.referralRecords}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Referral Records</h2>
        <p className={styles.subtitle}>Manage and track all referral activities</p>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search referrals..."
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
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

        <div className={styles.filterGroup}>
          <select
            value={rewardFilter}
            onChange={(e) => setRewardFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Rewards</option>
            <option value="low">Low (&lt; $50)</option>
            <option value="medium">Medium ($50 - $99)</option>
            <option value="high">High (≥ $100)</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className={styles.recordsTable}>
        {filteredRecords.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3>No referral records found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Referrer</div>
              <div className={styles.tableCell}>Referred User</div>
              <div className={styles.tableCell}>Date</div>
              <div className={styles.tableCell}>Reward</div>
              <div className={styles.tableCell}>Status</div>
              <div className={styles.tableCell}>Actions</div>
            </div>
            {filteredRecords.map((record) => (
              <div key={record.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {record.referrer.avatar}
                    </div>
                    <div>
                      <div className={styles.userName}>{record.referrer.name}</div>
                      <div className={styles.userEmail}>{record.referrer.email}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {record.referredUser.avatar}
                    </div>
                    <div>
                      <div className={styles.userName}>{record.referredUser.name}</div>
                      <div className={styles.userEmail}>{record.referredUser.email}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.dateInfo}>
                    <div className={styles.date}>{record.date}</div>
                    {record.conversionDate && (
                      <div className={styles.conversionDate}>
                        Converted: {record.conversionDate}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.tableCell}>
                  <span className={styles.rewardAmount}>{formatCurrency(record.rewardAmount)}</span>
                </div>
                <div className={styles.tableCell}>
                  <span className={`${styles.statusBadge} ${getStatusColor(record.status)}`}>
                    <Icon icon={getStatusIcon(record.status)} />
                    {record.status}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    {record.status === 'Pending' && (
                      <>
                        <button
                          className={`${styles.actionButton} ${styles.approveButton}`}
                          onClick={() => handleApprove(record.id)}
                          title="Approve"
                        >
                          <Icon icon="material-symbols:check" />
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.rejectButton}`}
                          onClick={() => handleReject(record.id)}
                          title="Reject"
                        >
                          <Icon icon="material-symbols:close" />
                        </button>
                      </>
                    )}
                    <button
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={() => handleView(record.id)}
                      title="View Details"
                    >
                      <Icon icon="material-symbols:visibility" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReferralRecords;
