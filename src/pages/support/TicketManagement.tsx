import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import styles from './TicketManagement.module.scss';

interface Ticket {
  id: string;
  ticketId: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  issueType: 'Technical' | 'Payment' | 'Referral' | 'General';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  dateSubmitted: string;
  lastUpdated: string;
  assignedTo?: string;
  description: string;
}

const TicketManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Dummy tickets data
  const tickets: Ticket[] = useMemo(() => [
    {
      id: '1',
      ticketId: 'TKT-2024-001',
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'JD'
      },
      issueType: 'Technical',
      status: 'Open',
      priority: 'High',
      dateSubmitted: '2024-01-15 14:30:00',
      lastUpdated: '2024-01-15 14:30:00',
      description: 'Unable to upload templates to the platform'
    },
    {
      id: '2',
      ticketId: 'TKT-2024-002',
      user: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'JS'
      },
      issueType: 'Payment',
      status: 'In Progress',
      priority: 'Medium',
      dateSubmitted: '2024-01-15 12:15:00',
      lastUpdated: '2024-01-15 13:45:00',
      assignedTo: 'Admin Team',
      description: 'Payment not processed for premium subscription'
    },
    {
      id: '3',
      ticketId: 'TKT-2024-003',
      user: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'MJ'
      },
      issueType: 'Referral',
      status: 'Resolved',
      priority: 'Low',
      dateSubmitted: '2024-01-14 16:45:00',
      lastUpdated: '2024-01-15 10:20:00',
      assignedTo: 'Support Team',
      description: 'Referral bonus not credited to wallet'
    },
    {
      id: '4',
      ticketId: 'TKT-2024-004',
      user: {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        avatar: 'SW'
      },
      issueType: 'General',
      status: 'Closed',
      priority: 'Low',
      dateSubmitted: '2024-01-14 10:20:00',
      lastUpdated: '2024-01-14 18:30:00',
      assignedTo: 'Support Team',
      description: 'Question about account settings'
    },
    {
      id: '5',
      ticketId: 'TKT-2024-005',
      user: {
        name: 'David Brown',
        email: 'david@example.com',
        avatar: 'DB'
      },
      issueType: 'Technical',
      status: 'Open',
      priority: 'High',
      dateSubmitted: '2024-01-13 18:30:00',
      lastUpdated: '2024-01-13 18:30:00',
      description: 'Music upload feature not working'
    }
  ], []);

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = 
        ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase().replace(' ', '') === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority.toLowerCase() === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || ticket.issueType.toLowerCase() === categoryFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const ticketDate = new Date(ticket.dateSubmitted);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - ticketDate.getTime()) / (1000 * 60 * 60 * 24));
        
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
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesDate;
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter, categoryFilter, dateFilter]);

  const handleView = (id: string) => {
    console.log('View ticket:', id);
  };

  const handleRespond = (id: string) => {
    console.log('Respond to ticket:', id);
  };

  const handleAssign = (id: string) => {
    console.log('Assign ticket:', id);
  };

  const handleClose = (id: string) => {
    console.log('Close ticket:', id);
  };

  const handleAddNote = (id: string) => {
    console.log('Add note to ticket:', id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open':
        return 'material-symbols:circle';
      case 'In Progress':
        return 'material-symbols:schedule';
      case 'Resolved':
        return 'material-symbols:check-circle';
      case 'Closed':
        return 'material-symbols:lock';
      default:
        return 'material-symbols:help';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return styles.open;
      case 'In Progress':
        return styles.inProgress;
      case 'Resolved':
        return styles.resolved;
      case 'Closed':
        return styles.closed;
      default:
        return styles.default;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return styles.high;
      case 'Medium':
        return styles.medium;
      case 'Low':
        return styles.low;
      default:
        return styles.default;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return styles.technical;
      case 'Payment':
        return styles.payment;
      case 'Referral':
        return styles.referral;
      case 'General':
        return styles.general;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.ticketManagement}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Ticket Management</h2>
        <p className={styles.subtitle}>Manage and track all support tickets</p>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search tickets..."
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
            <option value="open">Open</option>
            <option value="inprogress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="payment">Payment</option>
            <option value="referral">Referral</option>
            <option value="general">General</option>
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

      {/* Tickets Table */}
      <div className={styles.ticketsTable}>
        {filteredTickets.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎫</div>
            <h3>No tickets found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Ticket ID</div>
              <div className={styles.tableCell}>User</div>
              <div className={styles.tableCell}>Category</div>
              <div className={styles.tableCell}>Status</div>
              <div className={styles.tableCell}>Priority</div>
              <div className={styles.tableCell}>Date</div>
              <div className={styles.tableCell}>Actions</div>
            </div>
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <span className={styles.ticketId}>{ticket.ticketId}</span>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {ticket.user.avatar}
                    </div>
                    <div>
                      <div className={styles.userName}>{ticket.user.name}</div>
                      <div className={styles.userEmail}>{ticket.user.email}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.tableCell}>
                  <span className={`${styles.categoryBadge} ${getCategoryColor(ticket.issueType)}`}>
                    {ticket.issueType}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <span className={`${styles.statusBadge} ${getStatusColor(ticket.status)}`}>
                    <Icon icon={getStatusIcon(ticket.status)} />
                    {ticket.status}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <span className={`${styles.priorityBadge} ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.dateInfo}>
                    <div className={styles.date}>{ticket.dateSubmitted}</div>
                    {ticket.assignedTo && (
                      <div className={styles.assignedTo}>
                        Assigned: {ticket.assignedTo}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={() => handleView(ticket.id)}
                      title="View Ticket"
                    >
                      <Icon icon="material-symbols:visibility" />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.respondButton}`}
                      onClick={() => handleRespond(ticket.id)}
                      title="Respond"
                    >
                      <Icon icon="material-symbols:reply" />
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.assignButton}`}
                      onClick={() => handleAssign(ticket.id)}
                      title="Assign"
                    >
                      <Icon icon="material-symbols:assignment" />
                    </button>
                    {ticket.status !== 'Closed' && (
                      <button
                        className={`${styles.actionButton} ${styles.closeButton}`}
                        onClick={() => handleClose(ticket.id)}
                        title="Close"
                      >
                        <Icon icon="material-symbols:close" />
                      </button>
                    )}
                    <button
                      className={`${styles.actionButton} ${styles.noteButton}`}
                      onClick={() => handleAddNote(ticket.id)}
                      title="Add Note"
                    >
                      <Icon icon="material-symbols:note-add" />
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

export default TicketManagement;
