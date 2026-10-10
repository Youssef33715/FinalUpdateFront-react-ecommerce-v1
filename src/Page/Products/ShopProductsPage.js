import { useCallback, useState } from "react";
import { Container } from "react-bootstrap";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import ShopFilters from "../../Components/Products/ShopFilters";
import ShopFilterSheet from "../../Components/Products/ShopFilterSheet";
import ShopToolbar from "../../Components/Products/ShopToolbar";
import ShopActiveFilters from "../../Components/Products/ShopActiveFilters";
import ShopPagination from "../../Components/Products/ShopPagination";
import UseShopPageHook from "../../hook/products/use-shop-page-hook";
import { productsCountLabel } from "../../Components/Cart/cartHelpers";

const ShopProductsPage = () => {
  const hook = UseShopPageHook();
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const { loading, failed, items, filters } = hook;

  let summary = "جاري تحميل المنتجات...";
  if (!loading && !failed) {
    summary = items.length > 0 ? `عرض ${productsCountLabel(items.length)}` : "لا توجد نتائج";
    if (hook.pageCount > 1) summary += ` · صفحة ${hook.currentPage} من ${hook.pageCount}`;
  }

  const filterProps = {
    filters,
    categories: hook.categories,
    brands: hook.brands,
    onCategory: hook.setCategory,
    onBrand: hook.setBrand,
    onPrice: hook.setPrice,
    onClear: hook.clearAll,
    activeCount: hook.activeCount,
  };

  return (
    <div className="sf-page" style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        <ShopToolbar
          summary={summary}
          sort={filters.sort}
          onSort={hook.setSort}
          activeCount={hook.activeCount}
          onOpenFilters={() => setSheetOpen(true)}
        />
        <ShopActiveFilters hook={hook} />
        <div className="sf-layout">
          <aside className="sf-side">
            <ShopFilters idPrefix="d" {...filterProps} />
          </aside>
          <div className="sf-content">
            {loading ? (
              <div className="sf-grid" aria-busy="true" aria-label="جاري التحميل">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div className="sf-card sf-skel" key={i}>
                    <div className="sf-skel-img" />
                    <div className="sf-skel-line" />
                    <div className="sf-skel-line short" />
                  </div>
                ))}
              </div>
            ) : failed ? (
              <div className="sf-state sf-state-error">
                <div className="sf-state-t">تعذّر تحميل المنتجات</div>
                <div className="sf-state-d">حدث خطأ أثناء جلب المنتجات، حاول مرة أخرى</div>
                <button type="button" className="sf-btn sf-btn-inline" onClick={hook.clearAll}>إعادة المحاولة</button>
              </div>
            ) : items.length === 0 ? (
              <div className="sf-state">
                <div className="sf-state-t">لا توجد منتجات مطابقة</div>
                <div className="sf-state-d">جرّب تغيير الفلاتر أو كلمة البحث</div>
                {hook.activeCount > 0 ? (
                  <button type="button" className="sf-btn sf-btn-inline" onClick={hook.clearAll}>مسح الفلاتر</button>
                ) : null}
              </div>
            ) : (
              <CardProductsContainer variant="grid" products={items} showAddToCart />
            )}
            {!loading && !failed ? (
              <ShopPagination currentPage={hook.currentPage} pageCount={hook.pageCount} onPage={hook.goPage} />
            ) : null}
          </div>
        </div>
      </Container>
      <ShopFilterSheet
        open={sheetOpen}
        onClose={closeSheet}
        resultsLabel="عرض النتائج"
        idPrefix="m"
        {...filterProps}
      />
    </div>
  );
};

export default ShopProductsPage;
