import { useEffect } from "react";
import ShopFilters from "./ShopFilters";

// Mobile/tablet bottom sheet; filters apply live, the button just closes it.
const ShopFilterSheet = ({ open, onClose, resultsLabel, ...filterProps }) => {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="sf-sheet-wrap" role="dialog" aria-modal="true" aria-label="تصفية النتائج">
      <div className="sf-sheet-backdrop" onClick={onClose} />
      <div className="sf-sheet">
        <div className="sf-sheet-body">
          <ShopFilters idPrefix="m" {...filterProps} />
        </div>
        <button type="button" className="sf-btn" onClick={onClose}>{resultsLabel}</button>
      </div>
    </div>
  );
};

export default ShopFilterSheet;
