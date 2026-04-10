import { useState, useEffect, useCallback } from 'react';
import { listCarsService } from '../services/CarsService';
import { approveBookingService } from '../services/bookingService';
import { checkPartnerStatusService } from '../services/Otherservices';

const PER_PAGE = 10;

const initialFilters = {
  search: '',
  sort: 'Oldest',
  type: 'Cars',
  status: 'Pending',
};

const useRequest = () => {
  const [requests, setRequests]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [serverError, setServerError] = useState('');
  const [filters, setFilters]         = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal]             = useState(0);
  const [totalPages, setTotalPages]   = useState(1);

  const fetchRequests = useCallback(async () => {
    setServerError('');
    setLoading(true);
    try {
      let items = [];
      let totalCount = 0;
      let pages = 1;

      if (filters.type === 'Cars') {
        // ─── Cars requests ──────────────────────────────
        const statusParam = filters.status === 'All' ? undefined : filters.status.toLowerCase();
        const data = await listCarsService({
          page: currentPage,
          per_page: PER_PAGE,
          ...(statusParam && { status: statusParam }),
        });

        items = (data.cars || data.items || data || []).map((car) => ({
          id:          car.id,
          typeBadge:   'car',
          submittedBy: car.owner_name || car.owner?.name || '—',
          submittedOn: car.created_at
            ? new Date(car.created_at).toLocaleDateString('en-US', {
                month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
              })
            : '—',
          status: car.status
            ? car.status.charAt(0).toUpperCase() + car.status.slice(1)
            : 'Pending',
        }));

        totalCount = data.total || items.length;
        pages      = data.pages || 1;

      } else {
        // ─── Owner/Partner requests ──────────────────────
        const data = await checkPartnerStatusService();

        items = (data.applications || data.items || [data]).filter(Boolean).map((app) => ({
          id:          app.id,
          typeBadge:   'owner',
          submittedBy: app.full_name || app.name || '—',
          submittedOn: app.created_at
            ? new Date(app.created_at).toLocaleDateString('en-US', {
                month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
              })
            : '—',
          status: app.status
            ? app.status.charAt(0).toUpperCase() + app.status.slice(1)
            : 'Pending',
        }));

        totalCount = data.total || items.length;
        pages      = data.pages || 1;
      }

      // ─── فلترة الـ search محلياً ──────────────────────
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        items = items.filter(
          (r) =>
            String(r.id).includes(q) ||
            r.submittedBy.toLowerCase().includes(q)
        );
      }

      // ─── ترتيب حسب الـ sort ───────────────────────────
      items = [...items].sort((a, b) => {
        const dateA = new Date(a.submittedOn);
        const dateB = new Date(b.submittedOn);
        return filters.sort === 'Newest' ? dateB - dateA : dateA - dateB;
      });

      setRequests(items);
      setTotal(totalCount);
      setTotalPages(pages);

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to load requests.';
      setServerError(message);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  // ─── Accept All ───────────────────────────────────────
  const handleAcceptAll = async () => {
    try {
      const pendingIds = requests
        .filter((r) => r.status === 'Pending')
        .map((r) => r.id);

      if (pendingIds.length === 0) return;

      await Promise.all(pendingIds.map((id) => approveBookingService(id)));
      fetchRequests();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to accept requests.';
      setServerError(message);
    }
  };

  return {
    requests,
    loading,
    serverError,
    totalPages,
    currentPage,
    total,
    filters,
    handleFilterChange,
    handlePageChange,
    handleAcceptAll,
  };
};

export default useRequest;