// Controlled pagination built from the API's paginationResult
// (currentPage / numberOfPages), so it always matches the real page.
const pagesToShow = (current, total) => {
  const set = new Set([1, total, current - 1, current, current + 1]);
  const list = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  list.forEach((p, i) => {
    if (i > 0 && p - list[i - 1] > 1) out.push("gap" + p);
    out.push(p);
  });
  return out;
};

const ShopPagination = ({ currentPage, pageCount, onPage }) => {
  if (!pageCount || pageCount < 2) return null;
  return (
    <nav className="sf-pagination" aria-label="التنقل بين الصفحات">
      <button type="button" disabled={currentPage <= 1} onClick={() => onPage(currentPage - 1)}>السابق</button>
      {pagesToShow(currentPage, pageCount).map((p) =>
        typeof p === "string" ? (
          <span key={p} className="sf-gap">…</span>
        ) : (
          <button
            type="button"
            key={p}
            className={p === currentPage ? "on" : ""}
            aria-current={p === currentPage ? "page" : undefined}
            onClick={() => p !== currentPage && onPage(p)}
          >
            {p}
          </button>
        ),
      )}
      <button type="button" disabled={currentPage >= pageCount} onClick={() => onPage(currentPage + 1)}>التالي</button>
    </nav>
  );
};

export default ShopPagination;
