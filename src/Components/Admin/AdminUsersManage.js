import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AdminUsersHook from "../../hook/admin/admin-users-hook";
import AdminEmptyState from "./AdminEmptyState";
import Pagination from "../Uitily/Pagination";
import { formatDate, roleLabel } from "./adminFormat";

const emptyForm = { name: "", email: "", phone: "", role: "user", password: "", passwordConfirm: "" };

const AdminUsersManage = () => {
  const {
    users,
    totalResults,
    pageCount,
    onPageChange,
    loading,
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
  } = AdminUsersHook();

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (modalMode === "edit" && editTarget) {
      setForm({
        name: editTarget.name || "",
        email: editTarget.email || "",
        phone: editTarget.phone || "",
        role: editTarget.role || "user",
        password: "",
        passwordConfirm: "",
      });
    } else if (modalMode === "create") {
      setForm(emptyForm);
    }
  }, [modalMode, editTarget]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "create") submitCreate(form);
    else submitEdit(form);
  };

  return (
    <div className="adm-panel">
      <div className="adm-filters-row">
        <input
          className="adm-fsearch"
          placeholder="البحث بالاسم..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select className="adm-fselect" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">كل الأدوار</option>
          <option value="user">مستخدم</option>
          <option value="manager">مشرف</option>
          <option value="admin">مدير النظام</option>
        </select>
        <div className="adm-toolbar-end">
          <button className="adm-btn" onClick={openCreate}>+ إضافة مستخدم</button>
        </div>
      </div>

      {loading ? (
        <AdminEmptyState loading />
      ) : users.length === 0 ? (
        <AdminEmptyState emptyText="لا يوجد مستخدمون" />
      ) : (
        <>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr><th>المستخدم</th><th>البريد الإلكتروني</th><th>الدور</th><th>الحالة</th><th>تاريخ الإنشاء</th><th>الإجراءات</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className="adm-prod-cell">
                        <div className="adm-avatar">{(u.name || "U").charAt(0).toUpperCase()}</div>
                        <span className="adm-strong">{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td><span className="adm-roletag">{roleLabel(u.role)}</span></td>
                    <td>
                      <span className={`adm-status ${u.active === false ? "bad" : "ok"}`}>
                        <span className={`adm-dot ${u.active === false ? "adm-dot-bad" : "adm-dot-ok"}`} />
                        {u.active === false ? "غير نشط" : "نشط"}
                      </span>
                    </td>
                    <td>{formatDate(u.createdAt)}</td>
                    <td>
                      <div className="adm-row-actions">
                        <span onClick={() => openEdit(u)} style={{ cursor: "pointer" }} title="تعديل">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </span>
                        <span className="adm-act-del" onClick={() => askDelete(u)} style={{ cursor: "pointer" }} title="حذف">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="adm-table-foot">
            <div className="adm-count-note">المعروض في هذه الصفحة: {totalResults}</div>
            {pageCount > 1 && <Pagination pageCount={pageCount} onPress={onPageChange} />}
          </div>
        </>
      )}

      {/* create/edit modal */}
      <Modal show={!!modalMode} onHide={closeModal} centered>
        <Modal.Body className="p-4">
          <div className="adm-modal-title">{modalMode === "create" ? "إضافة مستخدم" : "تعديل المستخدم"}</div>
          <form onSubmit={onSubmit} className="d-flex flex-column gap-2">
            <input className="input-form" name="name" placeholder="الاسم" value={form.name} onChange={onChange} required />
            <input className="input-form" type="email" name="email" placeholder="البريد الإلكتروني" value={form.email} onChange={onChange} required />
            <input className="input-form" name="phone" placeholder="رقم الهاتف (اختياري)" value={form.phone} onChange={onChange} />
            <select className="select input-form-area" name="role" value={form.role} onChange={onChange}>
              <option value="user">مستخدم</option>
              <option value="manager">مشرف</option>
              <option value="admin">مدير النظام</option>
            </select>
            {modalMode === "create" && (
              <>
                <input className="input-form" type="password" name="password" placeholder="كلمة المرور" value={form.password} onChange={onChange} required minLength={6} />
                <input className="input-form" type="password" name="passwordConfirm" placeholder="تأكيد كلمة المرور" value={form.passwordConfirm} onChange={onChange} required minLength={6} />
              </>
            )}
            {formError && <div className="adm-error">{formError}</div>}
            <div className="adm-modal-actions">
              <Button variant="outline-dark" onClick={closeModal} type="button">إلغاء</Button>
              <Button variant="dark" type="submit" disabled={saving}>
                {saving ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* delete confirm */}
      <Modal show={!!deleteTarget} onHide={cancelDelete} centered>
        <Modal.Body className="text-center p-4">
          <p className="mb-4">هل أنت متأكد من حذف المستخدم "{deleteTarget?.name}"؟</p>
          {deleteError && <div className="adm-error mb-3">{deleteError}</div>}
          <Button variant="outline-dark" className="mx-2" onClick={cancelDelete}>إلغاء</Button>
          <Button variant="dark" className="mx-2" onClick={confirmDelete}>حذف</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminUsersManage;
