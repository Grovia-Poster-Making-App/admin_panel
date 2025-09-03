import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import { IOrdersTable } from "../../../interfaces/Itable";
import classes from "./OrderStats.module.scss";

interface OrderStatsProps {
  orders: IOrdersTable[];
}

const OrderStats: React.FC<OrderStatsProps> = ({ orders }) => {
  const stats = useMemo(() => {
    const total = orders.length;
    const completed = orders.filter(order => order.status === "Completed").length;
    const processing = orders.filter(order => order.status === "Processing").length;
    const pending = orders.filter(order => order.status === "Pending").length;
    const cancelled = orders.filter(order => order.status === "Cancelled").length;
    
    const totalRevenue = orders
      .filter(order => order.paymentStatus === "Paid")
      .reduce((sum, order) => {
        const amount = parseFloat(order.totalAmount.replace("$", ""));
        return sum + amount;
      }, 0);

    const averageOrderValue = total > 0 ? totalRevenue / total : 0;

    return {
      total,
      completed,
      processing,
      pending,
      cancelled,
      totalRevenue,
      averageOrderValue,
    };
  }, [orders]);

  const statItems = [
    {
      icon: "material-symbols:shopping-cart",
      label: "Total Orders",
      value: stats.total,
      color: "var(--primaryColor)",
    },
    {
      icon: "material-symbols:check-circle",
      label: "Completed",
      value: stats.completed,
      color: "#22c55e",
    },
    {
      icon: "material-symbols:schedule",
      label: "Processing",
      value: stats.processing,
      color: "#fbbf24",
    },
    {
      icon: "material-symbols:pending",
      label: "Pending",
      value: stats.pending,
      color: "#3b82f6",
    },
    {
      icon: "material-symbols:attach-money",
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      color: "#10b981",
    },
    {
      icon: "material-symbols:trending-up",
      label: "Avg Order Value",
      value: `$${stats.averageOrderValue.toFixed(2)}`,
      color: "#8b5cf6",
    },
  ];

  return (
    <div className={classes.statsContainer}>
      <div className={classes.statsGrid}>
        {statItems.map((stat, index) => (
          <div key={index} className={classes.statItem}>
            <div className={classes.statIcon} style={{ color: stat.color }}>
              <Icon icon={stat.icon} />
            </div>
            <div className={classes.statContent}>
              <div className={classes.statValue}>{stat.value}</div>
              <div className={classes.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStats;
