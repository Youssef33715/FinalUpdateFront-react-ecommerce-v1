import { useState } from "react";
import { useDispatch } from "react-redux";
import AllCategoryHook from "../category/all-category-page-hook";
import { updateCategory, deleteCategory, getAllCategoryPage } from "../../redux/actions/categoryAction";

// Wraps the existing, already-working AllCategoryHook (list + pagination)
// and adds edit/delete, which the frontend never had before even though the
// backend already supported them.
const AdminCategoryManageHook = () => {
  const dispatch = useDispatch();
  const [category, loading, pageCount, getPage] = AllCategoryHook();
  const [page, setPage] = useState(1);
  const [editTarget, setEditTarget] = useState(null);
  const [editName, setEditName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const onPageChange = (p) => {
    setPage(p);
    getPage(p);
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
      await dispatch(updateCategory(editTarget._id, { name: editName }));
      setEditTarget(null);
      dispatch(getAllCategoryPage(page));
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
      await dispatch(deleteCategory(deleteTarget._id));
      setDeleteTarget(null);
      dispatch(getAllCategoryPage(page));
    } finally {
      setSaving(false);
    }
  };

  return {
    items: category?.data || [],
    totalResults: category?.results ?? 0,
    loading,
    pageCount,
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

export default AdminCategoryManageHook;
