import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import EditCustomer from "../components/edit/editCustomer/EditCustomer";
import { IcustomersTable } from "../interfaces/Itable";
import { customers } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import { customersService } from "../api/services/customers.service";

function CustomerEdit() {
  const { t } = useTranslation();
  const params = useParams();
  let { customerId } = params;
  const [customerData, setCustomerData] = useState<IcustomersTable | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch customer data from API
  const fetchCustomer = async () => {
    if (!customerId) return;
    
    console.log('Looking for customer with ID:', customerId);
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Try to fetch single customer from API first
      try {
        const result = await customersService.getCustomer(customerId);
        
        if (result.success && result.data) {
          const user = result.data.user;
          
          // Transform API data to match the expected interface
          const transformedCustomer: IcustomersTable = {
            ID: user._id,
            userName: user.name || 'Unknown User',
            email: user.phoneNumber || 'No email',
            phoneNumber: user.phoneNumber || 'No phone',
            location: 'Unknown Location',
            whatsappNumber: user.whatsappNumber || 'No WhatsApp',
            gender: user.gender || 'other',
            isPhoneVerified: user.isPhoneVerified || false,
            isWhatsAppVerified: user.isWhatsAppVerified || false,
            createdAt: user.createdAt || new Date().toISOString(),
            rank: user.rank || [],
            avatar: '',
            totalOrders: 0,
            totalSpend: '0'
          };
          
          console.log('Found customer in API:', transformedCustomer);
          setCustomerData(transformedCustomer);
          return;
        } else {
          console.log('Customer not found in API, trying fallback...');
        }
      } catch (apiError: any) {
        console.warn('Single customer API fetch failed, trying fallback data:', apiError.message);
      }
      
      // Fallback to static data if API fails or customer not found
      console.log('Available customer IDs from fallback:', customers.map(c => c.ID));
      const fallbackCustomer = customers.find(
        (item) => item.ID.toString() === customerId || item.ID === parseInt(customerId || '0')
      );
      
      if (fallbackCustomer) {
        console.log('Found customer in fallback data:', fallbackCustomer);
        setCustomerData(fallbackCustomer);
      } else {
        console.error('Customer not found in either API or fallback data');
        throw new Error(`Customer with ID ${customerId} not found in API or fallback data`);
      }
    } catch (err) {
      console.error('Error fetching customer:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch customer');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch customer on component mount
  useEffect(() => {
    fetchCustomer();
  }, [customerId]); // eslint-disable-line react-hooks/exhaustive-deps

  let customerEdit;

  if (isLoading) {
    customerEdit = <LoadingSpinner />;
  } else if (error || !customerData) {
    customerEdit = (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Error loading customer</h3>
        <p>{error || 'Customer not found'}</p>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Looking for customer ID: {customerId}
        </p>
        <button 
          onClick={fetchCustomer}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  } else {
    customerEdit = <EditCustomer customer={customerData} />;
  }

  return (
    <section>
      <h2 className="title">{t("editCustomer")}</h2>
      {customerEdit}
    </section>
  );
}

export default CustomerEdit;
