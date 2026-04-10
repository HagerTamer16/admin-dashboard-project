import { useState, useEffect, useCallback } from 'react';
import { getBookingsService } from '../services/bookingService';

const initialStats = {
  activeTrips: 0,
  pickUpToday: 0,
  returnToday: 0,
  canceled: 0,
};

const today = new Date().toDateString();

const useBooking = () => {
  const [bookings, setBookings]       = useState([]);
  const [stats, setStats]             = useState(initialStats);
  const [loading, setLoading]         = useState(false);
  const [search, setSearch]           = useState('');
  const [status, setStatus]           = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [serverError, setServerError] = useState('');

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setServerError('');

      const data = await getBookingsService({
        page: currentPage,
        per_page: 10,
        status,
        search,
      });

      const list = data.bookings ?? [];
      const activeTrips = list.filter(b => b.Status === 'Active').length;
      const canceled    = list.filter(b => b.Status === 'Canceled').length;
      const pickUpToday = list.filter(b => new Date(b.StartDate).toDateString() === today).length;
      const returnToday = list.filter(b => new Date(b.EndDate).toDateString() === today).length;

      setStats({ activeTrips, pickUpToday, returnToday, canceled });

      const mapped = list.map((b) => ({
        id:         b.Id,
        car:        b.CarName,
        renter:     b.RenterName,
        owner:      b.OwnerName,
        duration:   `${b.Days} days`,
        totalPrice: `$${b.TotalPrice}`,
        status:     b.Status,
      }));

      setBookings(mapped);
      setTotalPages(data.total_pages ?? 1);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error   ||
        'Failed to load bookings.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, status, search]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBookings();
    }, search ? 400 : 0);

    return () => clearTimeout(delay);
  }, [fetchBookings, search]);

  const handlePageChange = (page) => setCurrentPage(page);

  // Refund All — هتحتاج endpoint من الباك
  const handleRefundAll = async () => {
    console.warn('Refund All: endpoint not available yet');
  };

  return {
    bookings,
    stats,
    loading,
    totalPages,
    currentPage,
    search,
    setSearch,
    status,
    setStatus,
    serverError,
    handlePageChange,
    handleRefundAll,
  };
};

export default useBooking;