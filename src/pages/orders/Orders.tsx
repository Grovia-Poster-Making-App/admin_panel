import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

import { orders, ordersHeader } from "../../constants/tables";
import OrderFilters from "./components/OrderFilters";
import OrderStats from "./components/OrderStats";
import classes from "./Orders.module.scss";
import CustomTable from "../../components/tables/customTable/CustomTable";
import OrdersTable from "./components/OrdersTable";

function Orders() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    let filtered = orders;

    // Search filter
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((order) => {
        return (
          order.customerName.toLowerCase().includes(searchLower) ||
          order.templateName.toLowerCase().includes(searchLower) ||
          order.templateCategory.toLowerCase().includes(searchLower) ||
          order.ID.toString().includes(searchTerm) ||
          order.orderDate.includes(searchTerm)
        );
      });
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((order) => order.templateCategory === categoryFilter);
    }

    // Payment filter
    if (paymentFilter !== "all") {
      filtered = filtered.filter((order) => order.paymentStatus === paymentFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter, categoryFilter, paymentFilter]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setPaymentFilter("all");
  };

  return (
    <section className={classes.ordersSection}>
      {/* Header */}
      <div className={classes.header}>
        <h2 className="title">{t("orders")}</h2>
        <div className={classes.headerActions}>
          <div className={classes.searchContainer}>
            <Icon icon="material-symbols:search" className={classes.searchIcon} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={classes.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className={classes.clearButton}
              >
                <Icon icon="material-symbols:close" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <OrderStats orders={filteredData} />

      {/* Filters */}
      <OrderFilters
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        paymentFilter={paymentFilter}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onPaymentChange={setPaymentFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Orders Table */}
      <OrdersTable
        limit={10}
        headData={ordersHeader}
        bodyData={filteredData}
      />
    </section>
  );
}

export default Orders;
