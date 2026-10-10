import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubCategoriesAdmin,
  updateSubCategory,
  deleteSubCategory,
} from "../../redux/actions/subcategoryAction";

const LIMIT = 10;

const AdminSubCategoryManageHook = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);
  const [editName, setEditName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const allSubCategoryAdmin = useSelector((state) => state.subCategory.allSubCategoryAdmin);

  const fetchList = useCallback(
    async (targetPage) => {
      setLoading(true);
      await dispatch(getAllSubCategoriesAdmin(targetPage || page, LIMIT));
      setLoading(false);
    },
    [dispatch, page],
  );

  useEffect(() => {
    fetchList(1);
    // eslint-disable-next-line
  }, []);

  const onPageChange = (p) => {
    setPage(p);
    fetchList(p);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    setEditName(item.name);
  };
  const cancelEdit = () => setEditTarget(null);
  const saveEdit = async () => {
    if (!editTarget) return;
    setSaving(true);
    try {
      await dispatch(updateSubCategory(editTarget._id, { name: editName }));
      setEditTarget(null);
      await fetchList(page);
    } finally {
      setSaving(false);
    }
  };

  const askDelete = (item) => setDeleteTarget(item);
  const cancelDelete = () => setDeleteTarget(null);
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      await dispatch(deleteSubCategory(deleteTarget._id));
      setDeleteTarget(null);
      await fetchList(page);
    } finally {
      setSaving(false);
    }
  };

  return {
    items: allSubCategoryAdmin?.data || [],
    totalResults: allSubCategoryAdmin?.results ?? 0,
    pageCount: allSubCategoryAdmin?.paginationResult?.numberOfPages || 0,
    loading,
    onPageChange,
    editTarget,
    editName,
    setEditName,
    openEdit,
    cancelEdit,
    saveEdit,
    deleteTarget,
    askDelete,
    cancelDelete,
    confirmDelete,
    saving,
  };
};

export default AdminSubCategoryManageHook;
