import { useState } from "react";
import { useDispatch } from "react-redux";
import AllBrandHook from "../brand/all-brand-page-hook";
import { updateBrand, deleteBrand, getAllBrandPage } from "../../redux/actions/brandAction";

const AdminBrandManageHook = () => {
  const dispatch = useDispatch();
  const [brand, loading, pageCount, getPage] = AllBrandHook();
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
      await dispatch(updateBrand(editTarget._id, { name: editName }));
      setEditTarget(null);
      dispatch(getAllBrandPage(page));
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
      await dispatch(deleteBrand(deleteTarget._id));
      setDeleteTarget(null);
      dispatch(getAllBrandPage(page));
    } finally {
      setSaving(false);
    }
  };

  return {
    items: brand?.data || [],
    totalResults: brand?.results ?? 0,
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

export default AdminBrandManageHook;
