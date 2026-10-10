import { useEffect, useRef, useState } from "react";
// Imported under a neutral name: it is a plain async GET helper, not a React hook.
import { useGetData as fetchPublic } from "../../hooks/useGetData";
import { productIdOf } from "../../Components/Cart/cartHelpers";

// GET /api/v1/cart returns cart rows that only hold the product id, so product
// details (title, image, category, stock) are loaded from the existing public
// GET /api/v1/products/:id and cached per product id.
// Each entry: { status: "loading" | "ok" | "missing" | "error", data? }
const UseCartProductsHook = (cartItems) => {
  const [products, setProducts] = useState({});
  const requested = useRef(new Set());
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const ids = Array.from(new Set((cartItems || []).map(productIdOf).filter(Boolean)));
  const key = ids.join(",");

  useEffect(() => {
    ids.forEach((id) => {
      if (requested.current.has(id)) return;
      requested.current.add(id);
      setProducts((prev) => ({ ...prev, [id]: { status: "loading" } }));
      fetchPublic(`/api/v1/products/${id}`)
        .then((res) => {
          if (!mounted.current) return;
          const data = res && res.data;
          setProducts((prev) => ({
            ...prev,
            [id]: data && data._id ? { status: "ok", data } : { status: "missing" },
          }));
        })
        .catch((e) => {
          if (!mounted.current) return;
          const notFound = e?.response?.status === 404;
          // allow a retry later for network errors, keep 404 as final
          if (!notFound) requested.current.delete(id);
          setProducts((prev) => ({
            ...prev,
            [id]: { status: notFound ? "missing" : "error" },
          }));
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return products;
};

export default UseCartProductsHook;
