import { Row, Col, Spinner, Modal, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddCategoryHook from "../../hook/category/add-category-hook";
import AdminCategoryManageHook from "../../hook/admin/admin-category-manage-hook";
import AdminEmptyState from "./AdminEmptyState";
import Pagination from "../Uitily/Pagination";

// Add-form logic is 100% untouched (same AddCategoryHook). Only the visual
// wrapper changed, and a real list+edit+delete section was added below it
// using the existing category endpoints that the frontend never exposed before.
const AdminAddCategory = () => {
  const [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName] = AddCategoryHook();

  const {
    items, totalResults, loading: listLoading, pageCount, onPageChange,
    editTarget, editName, setEditName, openEdit, cancelEdit, saveEdit,
    deleteTarget, askDelete, cancelDelete, confirmDelete, saving,
  } = AdminCategoryManageHook();

  return (
    <div>
      <div className="adm-form-panel mb-4">
        <div className="adm-panel-head">
          <div className="adm-t">إضافة قسم جديد</div>
        </div>
        <Row className="justify-content-start">
          <Col sm="8">
            <div className="text-form pb-2">صورة القسم</div>
            <div>
              <label htmlFor="upload-photo">
                <img src={img} alt="fzx" height="100px" width="120px" style={{ cursor: "pointer", borderRadius: 10 }} />
              </label>
              <input type="file" name="photo" onChange={onImageChange} id="upload-photo" />
            </div>
            <input
              onChange={onChangeName}
              value={name}
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم القسم"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="8" className="d-flex justify-content-end">
            <button onClick={handelSubmit} className="adm-btn mt-3">حفظ القسم</button>
          </Col>
        </Row>
        {isPress ? loading ? <Spinner animation="border" variant="dark" className="mt-2" /> : <div className="adm-count-note mt-2">تمت العملية بنجاح</div> : null}
      </div>

      <div className="adm-panel">
        <div className="adm-panel-head"><div className="adm-t">كل الأقسام</div></div>
        {listLoading ? (
          <AdminEmptyState loading />
        ) : items.length === 0 ? (
          <AdminEmptyState emptyText="لا توجد أقسام بعد" />
        ) : (
          <>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>الصورة</th><th>الاسم</th><th>الإجراءات</th></tr></thead>
                <tbody>
                  {items.map((c) => (
                    <tr key={c._id}>
                      <td><img className="adm-thumb" src={c.image} alt={c.name} /></td>
                      <td className="adm-strong">{c.name}</td>
                      <td>
                        <div className="adm-row-actions">
                          <span onClick={() => openEdit(c)} style={{ cursor: "pointer" }} title="تعديل">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                          </span>
                          <span className="adm-act-del" onClick={() => askDelete(c)} style={{ cursor: "pointer" }} title="حذف">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /></svg>
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
      </div>

      <Modal show={!!editTarget} onHide={cancelEdit} centered>
        <Modal.Body className="p-4">
          <div className="adm-modal-title">تعديل القسم</div>
          <input className="input-form d-block" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <div className="adm-modal-actions">
            <Button variant="outline-dark" onClick={cancelEdit}>إلغاء</Button>
            <Button variant="dark" onClick={saveEdit} disabled={saving}>{saving ? "جاري الحفظ..." : "حفظ"}</Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={!!deleteTarget} onHide={cancelDelete} centered>
        <Modal.Body className="text-center p-4">
          <p className="mb-4">هل أنت متأكد من حذف "{deleteTarget?.name}"؟</p>
          <Button variant="outline-dark" className="mx-2" onClick={cancelDelete}>إلغاء</Button>
          <Button variant="dark" className="mx-2" onClick={confirmDelete} disabled={saving}>حذف</Button>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default AdminAddCategory;
