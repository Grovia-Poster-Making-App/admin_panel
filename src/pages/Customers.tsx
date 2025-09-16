import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import CustomersTable from "../components/customers/CustomersTable";
import { IcustomersTable } from "../interfaces/Itable";
import { customers, customersHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import { customersService } from "../api/services/customers.service";
import styles from "./Customers.module.scss";

function Customers() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [apiData, setApiData] = useState<IcustomersTable[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [, setDeleteLoading] = useState<string | null>(null);

  // Fetch customers from API
  const fetchCustomers = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await customersService.getCustomers(page, 10);
      
      if (result.success && result.data) {
        // Transform API data to match the expected interface
        const transformedData: IcustomersTable[] = result.data.users.map((user: any, index: number) => ({
          ID: user._id || index + 1,
          userName: user.name || 'Unknown User',
          email: user.phoneNumber || 'No email',
          phoneNumber: user.phoneNumber || 'No phone',
          location: 'Unknown Location', // API doesn't provide location
          whatsappNumber: user.whatsappNumber || 'No WhatsApp',
          gender: user.gender || 'other',
          isPhoneVerified: user.isPhoneVerified || false,
          isWhatsAppVerified: user.isWhatsAppVerified || false,
          createdAt: user.createdAt || new Date().toISOString(),
          rank: user.rank || [],
          avatar: '', // Default empty avatar
          totalOrders: 0, // Default value
          totalSpend: '0' // Default value as string
        }));
        
        setApiData(transformedData);
        setCurrentPage(result.data.pagination.currentPage);
        setTotalPages(result.data.pagination.totalPages);
        setTotalUsers(result.data.pagination.totalUsers);
      } else {
        throw new Error(result.message || 'Failed to fetch customers');
      }
    } catch (err: any) {
      console.error('Error fetching customers:', err);
      
      // Handle AxiosError specifically
      if (err.isAxiosError) {
        const axiosError = err;
        console.error('Axios Error Details:', {
          message: axiosError.message,
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          url: axiosError.config?.url,
          method: axiosError.config?.method
        });
        
        if (axiosError.response?.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (axiosError.response?.status === 404) {
          setError('API endpoint not found. Please check server configuration.');
        } else if (axiosError.response?.status >= 500) {
          setError('Server error. Please try again later.');
        } else if (axiosError.code === 'ECONNREFUSED') {
          setError('Cannot connect to server. Please check if the server is running.');
        } else {
          setError(`API Error: ${axiosError.response?.data?.message || axiosError.message}`);
        }
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch customers');
      }
      // Keep fallback data on error
    } finally {
      setIsLoading(false);
    }
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (customerId: string) => {
    if (!window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(customerId);
      
      const result = await customersService.deleteCustomer(customerId);
      
      if (result.success) {
        // Remove customer from local state
        setApiData(prev => prev.filter(customer => customer.ID.toString() !== customerId));
        setTotalUsers(prev => prev - 1);
        console.log('Customer deleted successfully');
      } else {
        throw new Error(result.message || 'Failed to delete customer');
      }
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete customer');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers(1);
  }, []);

  // Get the data to work with (API data or fallback)
  const tableData: IcustomersTable[] = useMemo(() => {
    return apiData.length > 0 ? apiData : customers;
  }, [apiData]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === '') return tableData;
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    return tableData.filter((customer) => {
      return (
        customer.userName.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phoneNumber.includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchLower) ||
        customer.ID.toString().includes(searchTerm)
      );
    });
  }, [tableData, searchTerm]);

  let customerTable;

  if (isLoading) {
    customerTable = <LoadingSpinner />;
  } else if (error) {
    customerTable = (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>❌</div>
        <h3>Error loading customers</h3>
        <p>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => fetchCustomers(currentPage)}
        >
          Retry
        </button>
      </div>
    );
  } else {
    customerTable = (
      <CustomersTable 
        limit={10} 
        headData={customersHeader} 
        bodyData={filteredData} 
        onDelete={handleDeleteCustomer}
      />
    );
  }

  return (
    <section className={styles.customersSection}>
      <div className={styles.topBar}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{t("customers")}</h2>
          <div className={styles.customerCount}>
            Total: {apiData.length > 0 ? totalUsers : filteredData.length} customers
          </div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Icon icon="material-symbols:search" className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className={styles.clearButton}
              >
                <Icon icon="material-symbols:close" />
              </button>
            )}
          </div>
        </div>
      </div>
      {customerTable}
    </section>
  );
}

export default Customers;
