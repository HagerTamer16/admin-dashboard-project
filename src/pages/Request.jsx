import React from 'react';
import useRequest from '../hooks/Userequest';
import './Request.css';
import carIcon from '../assets/icons/car (2).svg';
import userIcon from '../assets/icons/user (1).svg';
import pendingDot from '../assets/icons/statues.svg';
import approvedDot from '../assets/icons/statues (1).svg';
import rejectedDot from '../assets/icons/Ellipse 268.svg';
import searchIcon from '../assets/icons/Group 159.svg';

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const statusDotMap = {
  Pending: pendingDot,
  Approved: approvedDot,
  Rejected: rejectedDot,
};

const Request = () => {
  const {
    requests,
    loading,
    totalPages,
    currentPage,
    total,
    filters,
    handleFilterChange,
    handlePageChange,
    handleAcceptAll,
  } = useRequest();

  return (
    <div className="request-container">
      <h1 className="request-title">Request Management</h1>
      <div className="request-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
          <img src={searchIcon} alt="search" className="search-icon" />
        </div>

        <div className="filter-select">
          <span>Sort : {filters.sort}</span>
          <ChevronIcon />
          <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
            <option>Oldest</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="filter-select">
          <span>Type : {filters.type}</span>
          <ChevronIcon />
          <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
            <option>Cars</option>
            <option>Owner</option>
          </select>
        </div>

        <div className="filter-select">
          <span>Status : {filters.status}({total})</span>
          <ChevronIcon />
          <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>All</option>
          </select>
        </div>
      </div>
      <div className="request-table-wrapper">
        <div className="table-header-row">
          <h2 className="table-title">Data Table</h2>
          <button className="accept-all-btn" onClick={handleAcceptAll}>Accept All</button>
        </div>

        <table className="request-table">
          <thead>
            <tr>
              <th>Reqest ID</th>
              <th>Type Badge</th>
              <th>Submitted by</th>
              <th>Submitted On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="loading-cell">Loading...</td></tr>
            ) : requests.map((row, i) => (
              <tr key={i}>
                <td className="id-cell">{row.id}</td>
                <td className="badge-cell">
                  <img src={row.typeBadge === 'car' ? carIcon : carIcon} alt="badge" className="badge-icon" />
                </td>
                <td>
                  <div className="submitted-by">
                    <img src={userIcon} alt="user" className="user-icon" />
                    <span>{row.submittedBy}</span>
                  </div>
                </td>
                <td className="date-cell">{row.submittedOn}</td>
                <td>
                  <span className="status-badge">
                    <img src={statusDotMap[row.status] || pendingDot} alt="status" className="status-dot-img" />
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Request;