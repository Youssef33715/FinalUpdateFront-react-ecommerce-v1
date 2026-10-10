import { Modal, Button } from "react-bootstrap";
import AdminReviewsHook from "../../hook/admin/admin-reviews-hook";
import AdminEmptyState from "./AdminEmptyState";
import Pagination from "../Uitily/Pagination";
import { formatDate } from "./adminFormat";

// NOTE: the backend's Review model only populates the "user" field (name),
// not "product" (stays a raw ObjectId — see reviewModel.js pre-find hook).
// So we show a shortened product ID rather than inventing a product name
// that the API doesn't actually return.
const AdminReviewsManage = () => {
  const {
    reviews,
    totalResults,
    pageCount,
    loading,
    onPageChange,
    deleteTarget,
    askDelete,
    cancelDelete,
    confirmDelete,
    deleting,
  } = AdminReviewsHook();

  return (
    <div className="adm-panel">
      {loading ? (
        <AdminEmptyState loading />
      ) : reviews.length === 0 ? (
        <AdminEmptyState emptyText="لا توجد تقييمات حتى الآن" />
      ) : (
        <>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr><th>المستخدم</th><th>التقييم</th><th>العنوان</th><th>رقم المنتج</th><th>التاريخ</th><th>الإجراءات</th></tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r._id}>
                    <td className="adm-strong">{r.user?.name || "—"}</td>
                    <td>
                      <span className="adm-roletag">★ {r.ratings} / 5</span>
                    </td>
                    <td>{r.title || "—"}</td>
                    <td>{typeof r.product === "string" ? r.product.slice(-6) : r.product?._id?.slice(-6) || "—"}</td>
                    <td>{formatDate(r.createdAt)}</td>
                    <td>
                      <div className="adm-row-actions">
                        <span className="adm-act-del" onClick={() => askDelete(r)} title="حذف">
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

      <Modal show={!!deleteTarget} onHide={cancelDelete} centered>
        <Modal.Body className="text-center p-4">
          <p className="mb-4">هل أنت متأكد من حذف هذا التقييم؟</p>
          <Button variant="outline-dark" className="mx-2" onClick={cancelDelete}>إلغاء</Button>
          <Button variant="dark" className="mx-2" onClick={confirmDelete} disabled={deleting}>
            {deleting ? "جاري الحذف..." : "حذف"}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminReviewsManage;
