import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import useFetch from "../hook/useFetch";
import CustomersTable from "../components/customers/CustomersTable";
import { IcustomersTable } from "../interfaces/Itable";
import { customers, customersHeader } from "../constants/tables";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";
import styles from "./Customers.module.scss";

const url =
  "https://admin-panel-79c71-default-rtdb.europe-west1.firebasedatabase.app/customers.json";

function Customers() {
  const { t } = useTranslation();
  const { data, status } = useFetch<IcustomersTable[]>(url);
  const [searchTerm, setSearchTerm] = useState("");

  // Get the data to work with (API data or fallback)
  const tableData = useMemo(() => {
    return data || customers;
  }, [data]);

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

  if (status === "loading") {
    customerTable = <LoadingSpinner />;
  } else {
    customerTable = (
      <CustomersTable limit={10} headData={customersHeader} bodyData={filteredData} />
    );
  }

  return (
    <section className={styles.customersSection}>
      <div className={styles.topBar}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{t("customers")}</h2>
          <div className={styles.customerCount}>
            Total: {filteredData.length} customers
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
