import { formatMoney } from "../Cart/cartHelpers";

// Removable chips for the filters that are really applied to the request.
const ShopActiveFilters = ({ hook }) => {
  const { filters, categoryName, brandName, searchWord, hasPrice } = hook;
  const chips = [];
  if (searchWord) chips.push({ key: "q", label: `بحث: ${searchWord}`, remove: hook.clearSearchWord });
  if (filters.category) chips.push({ key: "c", label: categoryName || "الفئة", remove: () => hook.setCategory("") });
  if (filters.brand) chips.push({ key: "b", label: brandName || "الماركة", remove: () => hook.setBrand("") });
  if (hasPrice) {
    const from = Number(filters.priceFrom) > 0 ? `من ${formatMoney(filters.priceFrom)}` : "";
    const to = Number(filters.priceTo) > 0 ? `إلى ${formatMoney(filters.priceTo)}` : "";
    chips.push({
      key: "p",
      label: `السعر ${from} ${to}`.trim(),
      remove: () => {
        hook.setPrice("priceFrom", "");
        hook.setPrice("priceTo", "");
      },
    });
  }
  if (chips.length === 0) return null;
  return (
    <div className="sf-chips" aria-label="الفلاتر المطبقة">
      {chips.map((c) => (
        <span className="sf-chip" key={c.key}>
          {c.label}
          <button type="button" onClick={c.remove} aria-label="إزالة الفلتر">×</button>
        </span>
      ))}
      <button type="button" className="sf-link-danger" onClick={hook.clearAll}>مسح الكل</button>
    </div>
  );
};

export default ShopActiveFilters;
