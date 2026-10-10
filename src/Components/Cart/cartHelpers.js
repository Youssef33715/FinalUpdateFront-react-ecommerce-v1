// Presentation helpers shared by the Cart and Checkout pages.
// They only format / derive values from real API data.

export const formatMoney = (value) => {
  const n = Number(value);
  if (value === undefined || value === null || value === "" || isNaN(n)) return "—";
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 2 })} جنيه`;
};

// Arabic count label for products: منتج واحد / منتجان / 3 منتجات / 11 منتجًا
export const productsCountLabel = (n) => {
  if (n === 1) return "منتج واحد";
  if (n === 2) return "منتجان";
  if (n >= 3 && n <= 10) return `${n} منتجات`;
  return `${n} منتجًا`;
};

// Cart rows only keep the product id; if a populated product is ever returned,
// its _id is used.
export const productIdOf = (item) => {
  const p = item?.product;
  if (!p) return "";
  return typeof p === "object" ? String(p._id || "") : String(p);
};

// Real totals from the cart. A discount exists only when the backend returned
// totalPriceAfterDiscount (> 0), which is the same rule the backend uses when
// it creates the order.
export const cartTotals = (totalCartPrice, totalCartPriceAfterDiscount) => {
  const subtotal = Number(totalCartPrice) || 0;
  const after = Number(totalCartPriceAfterDiscount);
  const hasDiscount = !isNaN(after) && after > 0 && after < subtotal;
  return {
    subtotal,
    hasDiscount,
    discount: hasDiscount ? subtotal - after : 0,
    total: hasDiscount ? after : subtotal,
  };
};

// Returns a short Arabic reason when a cart line can't be bought as it is,
// or "" when everything is fine (or product data is still loading).
export const itemIssue = (item, entry) => {
  if (!entry || entry.status === "loading") return "";
  if (entry.status === "missing") return "هذا المنتج لم يعد متاحًا";
  if (entry.status === "error") return "";
  const stock = entry.data?.quantity;
  if (typeof stock === "number") {
    if (stock <= 0) return "غير متوفر حاليًا";
    if (Number(item?.quantity) > stock) return `المتاح ${stock} فقط`;
  }
  return "";
};

export const cartIssues = (cartItems, products) =>
  (cartItems || []).filter((item) => itemIssue(item, products[productIdOf(item)]));
