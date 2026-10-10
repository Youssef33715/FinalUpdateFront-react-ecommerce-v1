import { Modal, Button } from "react-bootstrap";
import AdminProductsManageHook from "../../hook/admin/admin-products-manage-hook";
import AdminEmptyState from "./AdminEmptyState";
import Pagination from "../Uitily/Pagination";
import AdminAllProductCartRow from "./AdminAllProductCart";

// Search / filter / sort / pagination all go through the existing
// getAllProductsSearch action against the real /api/v1/products endpoint.
const AdminAllProduct = () => {
  const {
    items, loading, pageCount, onPageChange, keyword, setKeyword,
    category, setCategory, brand, setBrand, sort, setSort,
    categories, brands, totalResults,
    deleteTarget, askDelete, cancelDelete, confirmDelete, deleting,
  } = AdminProductsManageHook();

  return (
    <div className="adm-panel">
      <div className="adm-filters-row">
        <input
          className="adm-fsearch"
          placeholder="البحث عن المنتجات..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select className="adm-fselect" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">كل الأقسام</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <select className="adm-fselect" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">كل العلامات التجارية</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>
        <select className="adm-fselect" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">ترتيب حسب</option>
          <option value="-createdAt">الأحدث</option>
          <option value="-price">السعر: الأعلى أولًا</option>
          <option value="price">السعر: الأقل أولًا</option>
          <option value="-sold">الأكثر مبيعًا</option>
        </select>
      </div>

      {loading ? (
        <AdminEmptyState loading />
      ) : items.length === 0 ? (
        <AdminEmptyState emptyText="لا توجد منتجات مطابقة" />
      ) : (
        <>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>المنتج</th><th>العلامة التجارية</th><th>السعر</th>
                  <th>المخزون</th><th>الحالة</th><th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <AdminAllProductCartRow key={item._id} item={item} onAskDelete={askDelete} />
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
          <p className="mb-4">هل أنت متأكد من حذف المنتج "{deleteTarget?.title}"؟</p>
          <Button variant="outline-dark" className="mx-2" onClick={cancelDelete}>إلغاء</Button>
          <Button variant="dark" className="mx-2" onClick={confirmDelete} disabled={deleting}>
            {deleting ? "جاري الحذف..." : "حذف"}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminAllProduct;
