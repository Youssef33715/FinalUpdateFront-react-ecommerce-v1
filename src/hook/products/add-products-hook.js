import  { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { createProduct } from "../../redux/actions/productsAction";
import notify from "../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";



const AdminAddProductsHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());

    dispatch(getAllBrand());
  }, [dispatch]);

  //get last category state from redux

  const category = useSelector((state) => state.allCategory.category);

  //////////////////

  //get last category state from redux

  const brand = useSelector((state) => state.allbrand.brand);

  ////////////////////////

  //get last sub cat state from redux

  const subCat = useSelector((state) => state.subCategory.subcategory);

  ////////////////////////////////////

  const onSelect = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  const onRemove = (selectedList) => {
    setSelectedSubID(selectedList);
  };

  /////////////////

  const [options, setOptions] = useState([]);

  //values images

  const [images, setImages] = useState([]);

  // values state

  const [prodName, setProdName] = useState("");

  const [prodDescription, setProdDescription] = useState("");

  const [priceBefore, setPriceBefore] = useState("");

  const [priceAfter, setPriceAfter] = useState("");

  const [qty, setQty] = useState("");

  const [CatID, setCatID] = useState("");

  const [BrandID, setBrandID] = useState("");

  const [subCatID, setSubCatID] = useState([]);

  const [selectedSubID, setSelectedSubID] = useState([]);

  const [loading, setloading] = useState(true);
  // to Change name state
  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };
  // to Change Description state
  const onChangeDesName = (event) => {
    event.persist();
    setProdDescription(event.target.value);
  };
  // to Change name state
  const onChangePriceBefore = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };
  // to Change price after state
  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAfter(event.target.value);
  };
  // to Change name state
  const onChangeQty = (event) => {
    event.persist();
    setQty(event.target.value);
  };
  // to Change name state
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };

  // to show hide color picker
  const [showColor, setShowColor] = useState(false);

  // to store all pick color

  const [colors, setColors] = useState([]);

  // when choose new color

  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);

    setShowColor(!showColor);
  };

  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);

    setColors(newColor);
  };

  // when select category store id

      const onSelectCategory = async (e) => {
      if (e.target.value !== 0) {
       await dispatch(getOneCategory(e.target.value)); //=>id
        }

      setCatID(e.target.value);
    };

  useEffect(() => {
    if (CatID !== 0) {
      if (subCat.data) {
        setOptions(subCat.data);
      }
    }
  }, [CatID]);

  // when select Brand store id

  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };

  // to convert base 64 to file

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1], //
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  // to save data

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      CatID === "0" ||
      CatID === "" ||
      prodName === "" ||
      prodDescription === "" ||
      images.length <= 0 ||
      priceBefore <= 0
    ) {
      notify("من فضلك أكمل البيانات المطلوبة");

      return;
    }

    // convert base 64 image to file

    // ✅ نحول الـ object الخاص بالصور إلى array أولاً

    const imageArray = Object.values(images);

    if (imageArray.length === 0) {
      alert("من فضلك أضف صورة واحدة على الأقل للمنتج");

      return;
    }

    const imgCover = dataURLtoFile(imageArray[0], Math.random() + ".png");

    const itemImages = imageArray.map((img) =>
      dataURLtoFile(img, Math.random() + ".png"),
    );

    //////////////////////////////////

    const formData = new FormData();

    formData.append("title", prodName);
   // formData.append("slug", prodName.trim().toLowerCase().replace(/\s+/g, "-"));
    formData.append("description", prodDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);
    formData.append("priceAfterDiscount", priceAfter);


    formData.append("imageCover", imgCover);

    formData.append("category", CatID);

    if (BrandID && BrandID !== "0") {
      formData.append("brand", BrandID);
    }

    //  formData.append("brand", BrandID);

    itemImages.map((item) => formData.append("images", item));
    colors.map((color) => formData.append("colors", color));
    selectedSubID.map((item) => formData.append("subcategories[]", item._id));

    setloading(true);

    await dispatch(createProduct(formData));

    setloading(false);
  };

  //////////////

  //get last product state from redux

  const product = useSelector((state) => state.allproducts.products);

  useEffect(() => {
    if (loading === false) {
      setCatID(0);

      setColors([]);

      setImages([]);

      setProdName("");

      setProdDescription("");

      setPriceBefore("");

      setPriceAfter("");

      setQty("");

      setBrandID("");

      setSelectedSubID([]);

      setTimeout(() => setloading(true), 1500);

      if (product) {
        if (product === 201) {
          notify("تم الحفظ بنجاح", "success");
        } else {
          notify("حدثت مشكلة أثناء حفظ المنتج", "error");
        }
      }
    }
  }, [loading]);

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
  ];
};;;;;;

export default AdminAddProductsHook;
