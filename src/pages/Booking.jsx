import React from 'react';
import useBooking from '../hooks/UseBooking';
import './Booking.css';
import activeIcon from '../assets/icons/Vector (5).svg';
import pickupIcon from '../assets/icons/Pick up.svg';
import returnIcon from '../assets/icons/return.svg';
import canceledIcon from '../assets/icons/bloked.svg';
import userIcon from '../assets/icons/profile.svg';
import searchIconImg from '../assets/icons/Group 159.svg';
import activeDot from '../assets/icons/statues (1).svg';
import pendingDot from '../assets/icons/Ellipse 268.svg';

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const Booking = () => {
  const {
    bookings, stats, loading,
    totalPages, currentPage,
    search, setSearch,
    status, setStatus,
    handlePageChange, handleRefundAll,
  } = useBooking();

  return (
    <div className="booking-container">
      <h1 className="booking-title">Booking Management</h1>

    
      <div className="booking-stats">
        <div className="stat-card">
          <div className="stat-header">
            <img src={activeIcon} alt="Active" className="stat-icon" />
            <span className="stat-label">Active trips</span>
          </div>
          <div className="stat-value">{stats.activeTrips.toLocaleString()}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <img src={pickupIcon} alt="Pickup" className="stat-icon" />
            <span className="stat-label">Pick up today</span>
          </div>
          <div className="stat-value">{stats.pickUpToday}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <img src={returnIcon} alt="Return" className="stat-icon" />
            <span className="stat-label">Return Today</span>
          </div>
          <div className="stat-value">{stats.returnToday}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <img src={canceledIcon} alt="Canceled" className="stat-icon" />
            <span className="stat-label">Canceled</span>
          </div>
          <div className="stat-value">{stats.canceled}</div>
        </div>
      </div>

   
      <div className="booking-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <img src={searchIconImg} alt="search" className="search-icon" />
        </div>

        <div className="filter-select">
          <span>Status : {status}</span>
          <ChevronIcon />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Up coming</option>
            <option>pending</option>
            <option>Canceled</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      
      <div className="booking-table-wrapper">
        <div className="table-header-row">
          <h2 className="table-title">Data Table</h2>
          <button className="refund-btn" onClick={handleRefundAll}>Refund All</button>
        </div>

        <table className="booking-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Car</th>
              <th>Renter</th>
              <th>Owner</th>
              <th>Duration</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="loading-cell">Loading...</td></tr>
            ) : bookings.map((row, i) => (
              <tr key={i}>
                <td className="id-cell">{row.id}</td>
                <td>
                  <div className="car-cell">
                    <div className="car-img-placeholder" />
                    <span className="car-name">{row.car}</span>
                  </div>
                </td>
                <td>
                  <div className="user-cell">
                    <img src={userIcon} alt="user" className="user-icon" />
                    <span>{row.renter}</span>
                  </div>
                </td>
                <td>
                  <div className="user-cell">
                    <img src={userIcon} alt="user" className="user-icon" />
                    <span>{row.owner}</span>
                  </div>
                </td>
                <td className="duration-cell">{row.duration}</td>
                <td className="price-cell">{row.totalPrice}</td>
                <td>
                  <span className="status-badge">
                    <img
                      src={row.status === 'Active' ? activeDot : pendingDot}
                      alt="status"
                      className="status-dot-img"
                    />
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

export default Booking;