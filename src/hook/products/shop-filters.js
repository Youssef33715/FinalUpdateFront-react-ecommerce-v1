import { useSyncExternalStore } from "react";

// Single source of truth for the Products page filters.
// It lives in memory (not localStorage), so the filters shown in the UI are
// always the ones sent to the API and they never survive a page reload.
// The navbar search word is the only value still kept in localStorage,
// because the navbar writes it.

export const PAGE_LIMIT = 12;

export const SORT_OPTIONS = [
  { value: "", label: "الأحدث" },
  { value: "-sold", label: "الأكثر مبيعًا" },
  { value: "-ratingsAverage", label: "الأعلى تقييمًا" },
  { value: "price", label: "السعر من الأقل للأعلى" },
  { value: "-price", label: "السعر من الأعلى للأقل" },
];

const initial = { category: "", brand: "", priceFrom: "", priceTo: "", sort: "", page: 1 };
let snapshot = initial;
const listeners = new Set();

export const getShopFilters = () => snapshot;
export const subscribeShopFilters = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const setShopFilters = (patch) => {
  snapshot = { ...snapshot, ...patch };
  listeners.forEach((fn) => fn());
};
export const resetShopFilters = () => setShopFilters({ ...initial });
export const useShopFilters = () => useSyncExternalStore(subscribeShopFilters, getShopFilters);

export const readSearchWord = () => {
  try {
    return localStorage.getItem("searchWord") || "";
  } catch (e) {
    return "";
  }
};

// Query string for GET /api/v1/products.
// Category and brand use plain equality: the backend filter only converts
// gte/gt/lte/lt operators, so `category[in][]=...` can not be used.
export const buildShopQuery = (overrides = {}) => {
  const f = { ...snapshot, ...overrides };
  const parts = [`sort=${f.sort}`, `limit=${PAGE_LIMIT}`];
  if (f.page > 1) parts.push(`page=${f.page}`);
  parts.push(`keyword=${encodeURIComponent(readSearchWord())}`);
  if (f.category) parts.push(`category=${f.category}`);
  if (f.brand) parts.push(`brand=${f.brand}`);
  if (Number(f.priceFrom) > 0) parts.push(`price[gte]=${Number(f.priceFrom)}`);
  if (Number(f.priceTo) > 0) parts.push(`price[lte]=${Number(f.priceTo)}`);
  return parts.join("&");
};
