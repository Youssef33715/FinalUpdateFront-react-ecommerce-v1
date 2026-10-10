import { Spinner } from "react-bootstrap";

const AdminEmptyState = ({ loading, error, emptyText = "لا توجد بيانات حتى الآن" }) => {
  if (loading) {
    return (
      <div className="adm-loading">
        <Spinner animation="border" size="sm" />
        جاري التحميل...
      </div>
    );
  }
  if (error) {
    return <div className="adm-error">حدث خطأ أثناء تحميل البيانات، حاول مرة أخرى.</div>;
  }
  return (
    <div className="adm-empty">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M3 7l3-4h12l3 4" />
        <path d="M9 12h6" />
      </svg>
      <div>{emptyText}</div>
    </div>
  );
};

export default AdminEmptyState;
