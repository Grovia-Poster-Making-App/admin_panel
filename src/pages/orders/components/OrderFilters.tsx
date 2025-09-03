import React from "react";
import { Icon } from "@iconify/react";
import classes from "./OrderFilters.module.scss";

interface OrderFiltersProps {
  statusFilter: string;
  categoryFilter: string;
  paymentFilter: string;
  onStatusChange: (status: string) => void;
  onCategoryChange: (category: string) => void;
  onPaymentChange: (payment: string) => void;
  onClearFilters: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  statusFilter,
  categoryFilter,
  paymentFilter,
  onStatusChange,
  onCategoryChange,
  onPaymentChange,
  onClearFilters,
}) => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "Processing", label: "Processing" },
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Banner", label: "Banner" },
    { value: "Stories", label: "Stories" },
    { value: "Special Events", label: "Special Events" },
    { value: "Motivational Dose", label: "Motivational Dose" },
    { value: "Thank You Post", label: "Thank You Post" },
    { value: "Greetings", label: "Greetings" },
    { value: "Achievements", label: "Achievements" },
    { value: "Income Promotions", label: "Income Promotions" },
    { value: "Schedule", label: "Schedule" },
  ];

  const paymentOptions = [
    { value: "all", label: "All Payments" },
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Pending" },
    { value: "Refunded", label: "Refunded" },
  ];

  const hasActiveFilters = statusFilter !== "all" || categoryFilter !== "all" || paymentFilter !== "all";

  return (
    <div className={classes.filtersContainer}>
      <div className={classes.filtersRow}>
        <div className={classes.filterGroup}>
          <label className={classes.filterLabel}>
            <Icon icon="material-symbols:filter-list" className={classes.filterIcon} />
            Filters
          </label>
          <div className={classes.filters}>
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className={classes.filterSelect}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={classes.filterSelect}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => onPaymentChange(e.target.value)}
              className={classes.filterSelect}
            >
              {paymentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className={classes.clearFiltersButton}
          >
            <Icon icon="material-symbols:clear" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderFilters;
