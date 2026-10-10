import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, getProductLike } from "../../redux/actions/productsAction";
import { getOneBrand } from "../../redux/actions/brandAction";
// plain GET helper, imported under a neutral name (not a React hook)
import { useGetData as fetchList } from "../../hooks/useGetData";

const norm = (s) => String(s || "").trim().toLowerCase();

// Product details data. Returns [item, images, cat, brand, related, status]
// status: "loading" | "ready" | "missing"
//
// The products API populates `category` as { name } only (no _id), so:
// - the category name is read straight from the product
// - related products need the category id: it is found by matching the name
//   against the categories list, and used only when exactly one category matches
const VeiwProductDetailsHook = (prodID) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    let alive = true;
    setLoaded(false);
    Promise.resolve(dispatch(getOneProduct(prodID))).then(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, [dispatch, prodID]);

  const oneProduct = useSelector((state) => state.allproducts?.oneProduct);
  const oneBrand = useSelector((state) => state.allbrand?.oneBrand);
  const productLike = useSelector((state) => state.allproducts?.productLike);

  // ignore a product left in the store by a previously opened page
  const stored = oneProduct?.data;
  const item = stored && String(stored._id) === String(prodID) ? stored : {};

  const catName = item?.category?.name;
  const directCatId = item?.category?._id;

  useEffect(() => {
    if (item?.brand) dispatch(getOneBrand(item.brand));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.brand]);

  useEffect(() => {
    let alive = true;
    if (!item?._id) return undefined;
    if (directCatId) {
      setCategoryId(directCatId);
      return undefined;
    }
    if (!catName) return undefined;
    fetchList("/api/v1/categories?limit=1000")
      .then((r) => {
        const matches = (Array.isArray(r?.data) ? r.data : []).filter((c) => norm(c.name) === norm(catName));
        if (alive && matches.length === 1) setCategoryId(matches[0]._id);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [item?._id, catName, directCatId]);

  useEffect(() => {
    if (categoryId) dispatch(getProductLike(categoryId));
  }, [dispatch, categoryId]);

  let images = [];
  if (item?.imageCover) images.push({ original: item.imageCover });
  if (Array.isArray(item?.images)) images = [...images, ...item.images.map((img) => ({ original: img }))];

  const cat = { name: catName || "", _id: categoryId };
  const brand = oneBrand?.data && String(oneBrand.data._id) === String(item?.brand) ? oneBrand.data : {};

  // related: same category (name check guards against a list left by another product), not the product itself
  const likeList = Array.isArray(productLike?.data) ? productLike.data : [];
  const related = categoryId
    ? likeList
        .filter((p) => p && p._id !== item?._id && (!p.category?.name || norm(p.category.name) === norm(catName)))
        .slice(0, 4)
    : [];

  let status = "loading";
  if (loaded) status = item?._id ? "ready" : "missing";
  return [item, images, cat, brand, related, status];
};

export default VeiwProductDetailsHook;
