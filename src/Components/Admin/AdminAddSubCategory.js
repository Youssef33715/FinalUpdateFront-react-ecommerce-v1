import { Row, Col, Modal, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AddSubcategoryhook from "../../hook/subcategory/add-subcategory-hook";
import AdminSubCategoryManageHook from "../../hook/admin/admin-subcategory-manage-hook";
import AdminEmptyState from "./AdminEmptyState";
import Pagination from "../Uitily/Pagination";

// Add-form logic untouched (same AddSubcategoryhook). List+edit+delete added
// below — the backend already supported these, the frontend just never had
// a screen for them.
const AdminAddSubCategory = () => {
  const [, name, , category, , handelChange, handelSubmit, onChangeName] = AddSubcategoryhook();

  const {
    items, totalResults, loading: listLoading, pageCount, onPageChange,
    editTarget, editName, setEditName, openEdit, cancelEdit, saveEdit,
    deleteTarget, askDelete, cancelDelete, confirmDelete, saving,
  } = AdminSubCategoryManageHook();

  return (
    <div>
      <div className="adm-form-panel mb-4">
        <div className="adm-panel-head"><div className="adm-t">إضافة قسم فرعي جديد</div></div>
        <Row className="justify-content-start">
          <Col sm="8">
            <input
              value={name}
              onChange={onChangeName}
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم القسم الفرعي"
            />
            <select name="category" id="cat" className="select mt-3 px-2" onChange={handelChange}>
              <option value="0"> اختر القسم الرئيسي</option>
              {category && Array.isArray(category.data)
                ? category.data.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))
                : null}
            </select>
          </Col>
        </Row>
        <Row>
          <Col sm="8" className="d-flex justify-content-end">
            <button onClick={handelSubmit} className="adm-btn mt-3">حفظ القسم الفرعي</button>
          </Col>
        </Row>
      </div>

      <div className="adm-panel">
        <div className="adm-panel-head"><div className="adm-t">كل الأقسام الفرعية</div></div>
        {listLoading ? (
          <AdminEmptyState loading />
        ) : items.length === 0 ? (
          <AdminEmptyState emptyText="لا توجد أقسام فرعية بعد" />
        ) : (
          <>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>الاسم</th><th>القسم الرئيسي</th><th>الإجراءات</th></tr></thead>
                <tbody>
                  {items.map((s) => (
                    <tr key={s._id}>
                      <td className="adm-strong">{s.name}</td>
                      <td>{s.category?.name || "—"}</td>
                      <td>
                        <div className="adm-row-actions">
                          <span onClick={() => openEdit(s)} style={{ cursor: "pointer" }} title="تعديل">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                          </span>
                          <span className="adm-act-del" onClick={() => askDelete(s)} style={{ cursor: "pointer" }} title="حذف">
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
          <div className="adm-modal-title">تعديل القسم الفرعي</div>
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

export default AdminAddSubCategory;
