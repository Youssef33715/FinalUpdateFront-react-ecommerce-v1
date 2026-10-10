import { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import {
  getOneProduct,
  updateProducts,
} from "../../redux/actions/productsAction";
import notify from "../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";

const AdminEditProductsHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      await dispatch(getOneProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    run();
  }, [dispatch, id]);

  const item = useSelector((state) => state.allproducts.oneProduct);
  const category = useSelector((state) => state.allCategory.category);
  const brand = useSelector((state) => state.allbrand.brand);
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const onSelect = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  const onRemove = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [qty, setQty] = useState("");
  const [CatID, setCatID] = useState("");
  const [BrandID, setBrandID] = useState("");
  const [selectedSubID, setSelectedSubID] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (item?.data) {
      setImages(item.data.images || []);
      setProdName(item.data.title || "");
      setProdDescription(item.data.description || "");
      setPriceBefore(item.data.price || "");
      setPriceAfter(item.data.priceAfterDiscount || "");
      setQty(item.data.quantity || "");
      setCatID(
        typeof item.data.category === "object"
          ? item.data.category._id
          : item.data.category || "",
      );
      setBrandID(item.data.brand || "");
      setColors(item.data.colors || []);
    }
  }, [item]);

  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };

  const onChangeDesName = (event) => {
    event.persist();
    setProdDescription(event.target.value);
  };

  const onChangePriceBefore = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };

  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAfter(event.target.value);
  };

  const onChangeQty = (event) => {
    event.persist();
    setQty(event.target.value);
  };

  const [showColor, setShowColor] = useState(false);
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };

  const [colors, setColors] = useState([]);

  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };

  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  const onSelectCategory = async (e) => {
    setCatID(e.target.value);
  };

  useEffect(() => {
    if (CatID && CatID !== "0") {
      const run = async () => {
        await dispatch(getOneCategory(CatID));
      };
      run();
    }
  }, [CatID, dispatch]);

  useEffect(() => {
    if (subCat?.data) {
      setOptions(subCat.data);
    }
  }, [subCat]);

  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };

  // تحويل Base64 إلى File بأمان
  const base64ToFile = (dataurl, filename) => {
    try {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } catch (e) {
      console.error("Base64 conversion error:", e);
      return null;
    }
  };

  // حفظ وتحديث المنتج
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // تحويل images لمصفوفة أياً كان نوعها (Array أو Object أو FileList)
    const imagesArray = Array.isArray(images)
      ? images
      : images
        ? Object.values(images)
        : [];

    if (
      !CatID ||
      CatID === "0" ||
      !prodName ||
      !prodDescription ||
      imagesArray.length === 0 ||
      priceBefore <= 0
    ) {
      notify("من فضلك أكمل البيانات المطلوبة", "warn");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", prodName);
      formData.append("description", prodDescription);
      formData.append("quantity", qty);
      formData.append("price", priceBefore);

      if (priceAfter) {
        formData.append("priceAfterDiscount", priceAfter);
      }

      formData.append("category", CatID);

      if (BrandID && BrandID !== "0") {
        formData.append("brand", BrandID);
      }

      // معالجة مصفوفة الصور بأمان
      imagesArray.forEach((img, index) => {
        const item = typeof img === "object" && img?.file ? img.file : img;
        const src =
          typeof img === "object" && img?.data_url ? img.data_url : img;

        // 1. لو كائن File جاهز
        if (item instanceof File) {
          if (index === 0) formData.append("imageCover", item);
          formData.append("images", item);
        }
        // 2. لو Base64
        else if (typeof src === "string" && src.startsWith("data:")) {
          const file = base64ToFile(src, `image-${index}-${Date.now()}.png`);
          if (file) {
            if (index === 0) formData.append("imageCover", file);
            formData.append("images", file);
          }
        }
      });

      colors.forEach((color) => {
        formData.append("colors", color);
      });

      selectedSubID.forEach((sub) => {
        formData.append("subcategories[]", sub._id);
      });

      setloading(true);
      await dispatch(updateProducts(id, formData));
      setloading(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      notify("حدث خطأ أثناء حفظ البيانات", "error");
    }
  };

  const product = useSelector((state) => state.allproducts.updateProducts);

  useEffect(() => {
    if (loading === false) {
      setTimeout(() => setloading(true), 1500);

      if (product) {
        console.log("UPDATE RESPONSE:", product);
        if (product?.status === 200 || product?.status === "success") {
          notify("تم التعديل بنجاح", "success");
        } else {
          notify("حدثت مشكلة أثناء حفظ المنتج", "error");
        }
      }
    }
  }, [loading, product]);

  return [
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefore,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAfter,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handleChangeComplete,
    removeColor,
    onSelectCategory,
    handleSubmit,
    onSelectBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    CatID,
    BrandID,
  ];
};

export default AdminEditProductsHook;
