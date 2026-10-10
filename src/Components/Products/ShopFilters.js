// Filter groups (category, brand, price). Used by the desktop side panel and
// the mobile bottom sheet. Category and brand are single-select because the
// existing API supports equality filters only.
const Group = ({ title, name, options, value, onChange }) => (
  <div className="sf-fgroup" role="radiogroup" aria-label={title}>
    <div className="sf-fgroup-title">{title}</div>
    <label className="sf-opt">
      <input type="radio" name={name} checked={value === ""} onChange={() => onChange("")} />
      <span className="sf-radio" aria-hidden="true" />
      الكل
    </label>
    {options.map((o) => (
      <label className="sf-opt" key={o._id}>
        <input type="radio" name={name} checked={value === o._id} onChange={() => onChange(o._id)} />
        <span className="sf-radio" aria-hidden="true" />
        {o.name}
      </label>
    ))}
  </div>
);

const ShopFilters = ({ idPrefix, filters, categories, brands, onCategory, onBrand, onPrice, onClear, activeCount }) => (
  <div className="sf-filters">
    <div className="sf-filters-head">
      <span>تصفية النتائج</span>
      {activeCount > 0 ? (
        <button type="button" className="sf-link-danger" onClick={onClear}>مسح الكل</button>
      ) : null}
    </div>
    {categories.length > 0 ? (
      <Group title="الفئة" name={`${idPrefix}-cat`} options={categories} value={filters.category} onChange={onCategory} />
    ) : null}
    {brands.length > 0 ? (
      <Group title="الماركة" name={`${idPrefix}-brand`} options={brands} value={filters.brand} onChange={onBrand} />
    ) : null}
    <div className="sf-fgroup">
      <div className="sf-fgroup-title">السعر</div>
      <div className="sf-price">
        <input
          type="number"
          min="0"
          inputMode="numeric"
          placeholder="من"
          aria-label="السعر من"
          value={filters.priceFrom}
          onChange={(e) => onPrice("priceFrom", e.target.value)}
        />
        <input
          type="number"
          min="0"
          inputMode="numeric"
          placeholder="إلى"
          aria-label="السعر إلى"
          value={filters.priceTo}
          onChange={(e) => onPrice("priceTo", e.target.value)}
        />
      </div>
    </div>
  </div>
);

export default ShopFilters;
