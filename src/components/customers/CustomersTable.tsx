import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import classes from "./CustomersTable.module.scss";

interface CustomersTableProps {
  limit: number;
  headData: string[];
  bodyData: any[];
}

const CustomersTable: React.FC<CustomersTableProps> = ({ limit, headData, bodyData }) => {
  const [dataShow, setDataShow] = useState<any[]>([]);
  const [currPage, setCurrPage] = useState(0);

  const initDataShow = useCallback(() => {
    return bodyData.slice(0, limit);
  }, [bodyData, limit]);

  useEffect(() => {
    setDataShow(initDataShow());
    setCurrPage(0);
  }, [initDataShow]);

  const showModalHandler = () => {
    // Handle modal logic here
  };



  const tableBody = () => {
    return dataShow.map((item, index) => (
      <tr key={index} className={classes.tableRow}>
        <td className={classes.customerId}>
          <div className={classes.idWrapper}>
            <Icon icon="material-symbols:person" className={classes.idIcon} />
            <span>#{item.ID}</span>
          </div>
        </td>
        <td className={classes.customerCell}>
          <div className={classes.customerInfo}>
            <div className={classes.avatarContainer}>
              <img
                className={classes.avatar}
                src={item.avatar}
                alt="customer avatar"
              />
              <div className={classes.onlineIndicator}></div>
            </div>
            <div className={classes.customerDetails}>
              <Link to={`/customers/${item.ID}`} className={classes.customerName}>
                {item.userName}
              </Link>
              <div className={classes.customerEmail}>{item.email}</div>
            </div>
          </div>
        </td>
        <td className={classes.contactCell}>
          <div className={classes.contactWrapper}>
            <Icon icon="material-symbols:phone" className={classes.contactIcon} />
            <div className={classes.contactInfo}>
              <div className={classes.phoneNumber}>{item.phoneNumber}</div>
              <div className={classes.contactType}>Mobile</div>
            </div>
          </div>
        </td>
        <td className={classes.ordersCell}>
          <div className={classes.ordersWrapper}>
            <Icon icon="material-symbols:shopping-bag" className={classes.ordersIcon} />
            <span className={classes.ordersCount}>{item.totalOrders}</span>
          </div>
        </td>
        <td className={classes.spendCell}>
          <div className={classes.spendWrapper}>
            <Icon icon="material-symbols:attach-money" className={classes.spendIcon} />
            <span className={classes.spendAmount}>{item.totalSpend}</span>
          </div>
        </td>
        {/* <td className={classes.locationCell}>
          <div className={classes.locationWrapper}>
            <Icon icon="material-symbols:location-on" className={classes.locationIcon} />
            <span className={classes.location}>{item.location}</span>
          </div>
        </td> */}

        <td className={classes.actionsCell}>
          <div className={classes.actionsContainer}>
            <button className={classes.actionBtn} onClick={showModalHandler}>
              <Icon icon="material-symbols:visibility" />
            </button>
            <Link to={`/customers/${item.ID}`} className={classes.actionBtn}>
              <Icon icon="material-symbols:edit" />
            </Link>
            <button className={`${classes.actionBtn} ${classes.deleteBtn}`} onClick={showModalHandler}>
              <Icon icon="material-symbols:delete" />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  const pages = Math.ceil(bodyData.length / limit);
  const startIndex = currPage * limit;
  const endIndex = Math.min(startIndex + limit, bodyData.length);

  const handlePageChange = (page: number) => {
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    setDataShow(bodyData.slice(startIndex, endIndex));
    setCurrPage(page);
  };

  const renderPagination = () => {
    if (pages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pages - 1, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${classes.paginationBtn} ${currPage === i ? classes.active : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <div className={classes.paginationWrapper}>
        <div className={classes.paginationInfo}>
          <Icon icon="material-symbols:info" className={classes.infoIcon} />
          <span>Showing {startIndex + 1} to {endIndex} of {bodyData.length} customers</span>
        </div>
        <div className={classes.paginationControls}>
          <button
            className={`${classes.paginationBtn} ${classes.navBtn}`}
            onClick={() => handlePageChange(currPage - 1)}
            disabled={currPage === 0}
          >
            <Icon icon="material-symbols:chevron-left" />
            <span>Previous</span>
          </button>
          
          <div className={classes.pageNumbers}>
            {startPage > 0 && (
              <>
                <button
                  className={classes.paginationBtn}
                  onClick={() => handlePageChange(0)}
                >
                  1
                </button>
                {startPage > 1 && <span className={classes.ellipsis}>...</span>}
              </>
            )}
            {pageNumbers}
            {endPage < pages - 1 && (
              <>
                {endPage < pages - 2 && <span className={classes.ellipsis}>...</span>}
                <button
                  className={classes.paginationBtn}
                  onClick={() => handlePageChange(pages - 1)}
                >
                  {pages}
                </button>
              </>
            )}
          </div>
          
          <button
            className={`${classes.paginationBtn} ${classes.navBtn}`}
            onClick={() => handlePageChange(currPage + 1)}
            disabled={currPage === pages - 1}
          >
            <span>Next</span>
            <Icon icon="material-symbols:chevron-right" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.tableContainer}>
      <div className={classes.tableHeader}>
        <div className={classes.tableTitle}>
          <Icon icon="material-symbols:people" className={classes.titleIcon} />
          <h3>Customers Overview</h3>
        </div>
        <div className={classes.tableStats}>
          <div className={classes.statItem}>
            <Icon icon="material-symbols:trending-up" />
            <span>+8% from last month</span>
          </div>
        </div>
      </div>
      
      <div className={classes.tableWrapper}>
        <table className={classes.table}>
          <thead className={classes.tableHead}>
            <tr>
              {headData.map((item, index) => (
                <th key={index} className={classes.tableHeaderCell}>
                  <div className={classes.headerContent}>
                    <span>{item}</span>
                    <Icon icon="material-symbols:unfold-more" className={classes.sortIcon} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={classes.tableBody}>{tableBody()}</tbody>
        </table>
      </div>
      
      {renderPagination()}
    </div>
  );
};

export default CustomersTable;
