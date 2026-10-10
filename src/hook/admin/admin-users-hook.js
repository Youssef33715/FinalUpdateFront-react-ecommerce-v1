import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFiltered,
  createUser,
  updateUser,
  deleteUser,
} from "../../redux/actions/userAction";

const LIMIT = 10;

const AdminUsersHook = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // "create" | "edit" | null
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const allUsers = useSelector((state) => state.adminUsers.allUsers);

  const buildQuery = useCallback(
    (targetPage) => {
      const params = new URLSearchParams();
      if (keyword) params.set("keyword", keyword);
      if (role) params.set("role", role);
      params.set("page", targetPage || page);
      params.set("limit", LIMIT);
      return params.toString();
    },
    [keyword, role, page],
  );

  const fetchUsers = useCallback(
    async (targetPage) => {
      setLoading(true);
      await dispatch(getAllUsersFiltered(buildQuery(targetPage)));
      setLoading(false);
    },
    [dispatch, buildQuery],
  );

  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line
  }, []);

  // re-fetch on filter change, reset to page 1 (same pattern as products)
  useEffect(() => {
    setPage(1);
    fetchUsers(1);
    // eslint-disable-next-line
  }, [keyword, role]);

  const onPageChange = (newPage) => {
    setPage(newPage);
    fetchUsers(newPage);
  };

  const openCreate = () => {
    setFormError("");
    setModalMode("create");
  };
  const openEdit = (user) => {
    setFormError("");
    setEditTarget(user);
    setModalMode("edit");
  };
  const closeModal = () => {
    setModalMode(null);
    setEditTarget(null);
    setFormError("");
  };

  const submitCreate = async (form) => {
    setSaving(true);
    setFormError("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("password", form.password);
      fd.append("passwordConfirm", form.passwordConfirm);
      if (form.phone) fd.append("phone", form.phone);
      if (form.role) fd.append("role", form.role);
      const res = await dispatch(createUser(fd));
      closeModal();
      await fetchUsers(page);
      return res;
    } catch (e) {
      setFormError("تعذر إنشاء المستخدم، تأكد من صحة البيانات");
    } finally {
      setSaving(false);
    }
  };

  const submitEdit = async (form) => {
    setSaving(true);
    setFormError("");
    try {
      await dispatch(
        updateUser(editTarget._id, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
        }),
      );
      closeModal();
      await fetchUsers(page);
    } catch (e) {
      setFormError("تعذر تعديل المستخدم");
    } finally {
      setSaving(false);
    }
  };

  const askDelete = (user) => {
    setDeleteError("");
    setDeleteTarget(user);
  };
  const cancelDelete = () => {
    setDeleteTarget(null);
    setDeleteError("");
  };
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setSaving(true);
    setDeleteError("");
    try {
      await dispatch(deleteUser(deleteTarget._id));
      // Only reached if the delete actually succeeded — the thunk now
      // rethrows on failure, so this line no longer runs after a failed request.
      setDeleteTarget(null);
      await fetchUsers(page);
    } catch (e) {
      setDeleteError("تعذر حذف المستخدم، حاول مرة أخرى");
    } finally {
      setSaving(false);
    }
  };

  return {
    users: allUsers?.data || [],
    totalResults: allUsers?.results ?? 0,
    pageCount: allUsers?.paginationResult?.numberOfPages || 0,
    page,
    loading,
    onPageChange,
    keyword,
    setKeyword,
    role,
    setRole,
    modalMode,
    editTarget,
    openCreate,
    openEdit,
    closeModal,
    submitCreate,
    submitEdit,
    saving,
    formError,
    deleteTarget,
    askDelete,
    cancelDelete,
    confirmDelete,
    deleteError,
  };
};

export default AdminUsersHook;
