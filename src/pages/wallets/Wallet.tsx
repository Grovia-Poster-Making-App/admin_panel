import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './Wallet.module.scss';

interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Refund';
  amount: number;
  user: string;
  userEmail: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  description: string;
  reference: string;
}

interface WalletStats {
  currentBalance: number;
  pendingApprovals: number;
  totalApproved: number;
  totalPending: number;
  monthlyTransactions: number;
}

const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'history'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Dummy wallet statistics
  const walletStats: WalletStats = useMemo(() => ({
    currentBalance: 125000,
    pendingApprovals: 8,
    totalApproved: 450000,
    totalPending: 25000,
    monthlyTransactions: 156
  }), []);

  // Dummy transactions data
  const transactions: Transaction[] = useMemo(() => [
    {
      id: '1',
      type: 'Withdrawal',
      amount: 5000,
      user: 'John Doe',
      userEmail: 'john@example.com',
      date: '2024-01-15 14:30:00',
      status: 'Pending',
      description: 'Withdrawal request for business expenses',
      reference: 'WD-2024-001'
    },
    {
      id: '2',
      type: 'Deposit',
      amount: 15000,
      user: 'Jane Smith',
      userEmail: 'jane@example.com',
      date: '2024-01-15 12:15:00',
      status: 'Approved',
      description: 'Template purchase payment',
      reference: 'DP-2024-002'
    },
    {
      id: '3',
      type: 'Withdrawal',
      amount: 8000,
      user: 'Mike Johnson',
      userEmail: 'mike@example.com',
      date: '2024-01-14 16:45:00',
      status: 'Pending',
      description: 'Earnings withdrawal',
      reference: 'WD-2024-003'
    },
    {
      id: '4',
      type: 'Transfer',
      amount: 3000,
      user: 'Sarah Wilson',
      userEmail: 'sarah@example.com',
      date: '2024-01-14 10:20:00',
      status: 'Completed',
      description: 'Internal transfer to savings',
      reference: 'TR-2024-004'
    },
    {
      id: '5',
      type: 'Refund',
      amount: 2500,
      user: 'David Brown',
      userEmail: 'david@example.com',
      date: '2024-01-13 18:30:00',
      status: 'Approved',
      description: 'Template refund request',
      reference: 'RF-2024-005'
    }
  ], []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter;
      const matchesType = typeFilter === 'all' || transaction.type.toLowerCase() === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [transactions, searchTerm, statusFilter, typeFilter]);

  const pendingTransactions = useMemo(() => {
    return transactions.filter(t => t.status === 'Pending');
  }, [transactions]);

  const handleApprove = (id: string) => {
    console.log('Approve transaction:', id);
  };

  const handleReject = (id: string) => {
    console.log('Reject transaction:', id);
  };

  const handleView = (id: string) => {
    console.log('View transaction:', id);
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Deposit':
        return styles.success;
      case 'Withdrawal':
        return styles.warning;
      case 'Transfer':
        return styles.info;
      case 'Refund':
        return styles.error;
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
    <section className={styles.walletSection}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Wallet Management</h2>
        </div>

      </div>

      {/* Wallet Overview Stats */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:account-balance-wallet" />
          </div>
          <div className={styles.statContent}>
            <h3>Current Balance</h3>
            <p>{formatCurrency(walletStats.currentBalance)}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:pending" />
          </div>
          <div className={styles.statContent}>
            <h3>Pending Approvals</h3>
            <p>{walletStats.pendingApprovals}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:check-circle" />
          </div>
          <div className={styles.statContent}>
            <h3>Total Approved</h3>
            <p>{formatCurrency(walletStats.totalApproved)}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Icon icon="material-symbols:trending-up" />
          </div>
          <div className={styles.statContent}>
            <h3>Monthly Transactions</h3>
            <p>{walletStats.monthlyTransactions}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Icon icon="material-symbols:dashboard" />
          Overview
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'approvals' ? styles.active : ''}`}
          onClick={() => setActiveTab('approvals')}
        >
          <Icon icon="material-symbols:approval" />
          Approvals ({pendingTransactions.length})
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Icon icon="material-symbols:history" />
          History
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <div className={styles.overviewTab}>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewCard}>
                <h3>Recent Activity</h3>
                <div className={styles.activityList}>
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className={styles.activityItem}>
                      <div className={styles.activityIcon}>
                        <Icon icon={getStatusIcon(transaction.status)} />
                      </div>
                      <div className={styles.activityContent}>
                        <div className={styles.activityHeader}>
                          <span className={styles.activityUser}>{transaction.user}</span>
                          <span className={`${styles.activityType} ${getTypeColor(transaction.type)}`}>
                            {transaction.type}
                          </span>
                        </div>
                        <div className={styles.activityDetails}>
                          <span className={styles.activityAmount}>{formatCurrency(transaction.amount)}</span>
                          <span className={styles.activityDate}>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              

            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className={styles.approvalsTab}>
            <div className={styles.pendingTransactions}>
              {pendingTransactions.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>✅</div>
                  <h3>No pending approvals</h3>
                  <p>All transactions have been processed</p>
                </div>
              ) : (
                pendingTransactions.map((transaction) => (
                  <div key={transaction.id} className={styles.approvalCard}>
                    <div className={styles.approvalHeader}>
                      <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                          {transaction.user.charAt(0)}
                        </div>
                        <div className={styles.userDetails}>
                          <h4>{transaction.user}</h4>
                          <p>{transaction.userEmail}</p>
                        </div>
                      </div>
                      <div className={styles.transactionInfo}>
                        <span className={styles.transactionAmount}>{formatCurrency(transaction.amount)}</span>
                        <span className={`${styles.transactionType} ${getTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.approvalContent}>
                      <div className={styles.transactionDetails}>
                        <p><strong>Reference:</strong> {transaction.reference}</p>
                        <p><strong>Description:</strong> {transaction.description}</p>
                        <p><strong>Date:</strong> {transaction.date}</p>
                      </div>
                      
                      <div className={styles.approvalActions}>
                        <button
                          className={`${styles.actionButton} ${styles.approveButton}`}
                          onClick={() => handleApprove(transaction.id)}
                        >
                          <Icon icon="material-symbols:check" />
                          Approve
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.rejectButton}`}
                          onClick={() => handleReject(transaction.id)}
                        >
                          <Icon icon="material-symbols:close" />
                          Reject
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          onClick={() => handleView(transaction.id)}
                        >
                          <Icon icon="material-symbols:visibility" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className={styles.historyTab}>
            {/* Filters */}
            <div className={styles.filtersSection}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInputWrapper}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search transactions..."
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
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Types</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="transfer">Transfer</option>
                  <option value="refund">Refund</option>
                </select>
              </div>
            </div>

            {/* Transaction History */}
            <div className={styles.transactionHistory}>
              {filteredTransactions.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📊</div>
                  <h3>No transactions found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className={styles.transactionTable}>
                  <div className={styles.tableHeader}>
                    <div className={styles.tableCell}>Type</div>
                    <div className={styles.tableCell}>User</div>
                    <div className={styles.tableCell}>Amount</div>
                    <div className={styles.tableCell}>Date</div>
                    <div className={styles.tableCell}>Status</div>
                    <div className={styles.tableCell}>Actions</div>
                  </div>
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className={styles.tableRow}>
                      <div className={styles.tableCell}>
                        <span className={`${styles.typeBadge} ${getTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </div>
                      <div className={styles.tableCell}>
                        <div className={styles.userInfo}>
                          <div className={styles.userAvatar}>
                            {transaction.user.charAt(0)}
                          </div>
                          <div>
                            <div className={styles.userName}>{transaction.user}</div>
                            <div className={styles.userEmail}>{transaction.userEmail}</div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.tableCell}>
                        <span className={styles.amount}>{formatCurrency(transaction.amount)}</span>
                      </div>
                      <div className={styles.tableCell}>
                        <span className={styles.date}>{transaction.date}</span>
                      </div>
                      <div className={styles.tableCell}>
                        <span className={`${styles.statusBadge} ${getStatusColor(transaction.status)}`}>
                          <Icon icon={getStatusIcon(transaction.status)} />
                          {transaction.status}
                        </span>
                      </div>
                      <div className={styles.tableCell}>
                        <button
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          onClick={() => handleView(transaction.id)}
                          title="View Details"
                        >
                          <Icon icon="material-symbols:visibility" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wallet;
