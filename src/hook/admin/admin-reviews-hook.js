import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsAdmin, deleteReviewonProduct } from "../../redux/actions/reviewAction";

const LIMIT = 10;

const AdminReviewsHook = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const allReviewsAdmin = useSelector((state) => state.reviewReducer.allReviewsAdmin);

  const fetchReviews = useCallback(
    async (targetPage) => {
      setLoading(true);
      await dispatch(getAllReviewsAdmin(targetPage || page, LIMIT));
      setLoading(false);
    },
    [dispatch, page],
  );

  useEffect(() => {
    fetchReviews(1);
    // eslint-disable-next-line
  }, []);

  const onPageChange = (newPage) => {
    setPage(newPage);
    fetchReviews(newPage);
  };

  const askDelete = (review) => setDeleteTarget(review);
  const cancelDelete = () => setDeleteTarget(null);
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await dispatch(deleteReviewonProduct(deleteTarget._id));
      setDeleteTarget(null);
      await fetchReviews(page);
    } finally {
      setDeleting(false);
    }
  };

  return {
    reviews: allReviewsAdmin?.data || [],
    totalResults: allReviewsAdmin?.results ?? 0,
    pageCount: allReviewsAdmin?.paginationResult?.numberOfPages || 0,
    loading,
    onPageChange,
    deleteTarget,
    askDelete,
    cancelDelete,
    confirmDelete,
    deleting,
  };
};

export default AdminReviewsHook;
