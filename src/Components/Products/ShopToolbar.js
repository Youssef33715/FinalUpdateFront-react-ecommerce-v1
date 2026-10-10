import { SORT_OPTIONS } from "../../hook/products/shop-filters";

const ShopToolbar = ({ summary, sort, onSort, activeCount, onOpenFilters }) => (
  <div className="sf-toolbar">
    <div>
      <h1 className="sf-title">المنتجات</h1>
      <div className="sf-summary">{summary}</div>
    </div>
    <div className="sf-toolbar-actions">
      <button type="button" className="sf-filter-btn" onClick={onOpenFilters}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
        تصفية{activeCount > 0 ? ` (${activeCount})` : ""}
      </button>
      <label className="sf-sort">
        <span>ترتيب:</span>
        <select value={sort} onChange={(e) => onSort(e.target.value)} aria-label="ترتيب المنتجات">
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>
    </div>
  </div>
);

export default ShopToolbar;
