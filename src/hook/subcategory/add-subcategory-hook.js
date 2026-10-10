import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";

import notify from "../../hook/useNotifaction";
import { createSubCategory } from "../../redux/actions/subcategoryAction";

const AddSubcategoryhook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
        if (!navigator.onLine) {
          notify("هناك مشكلة في الاتصال بالإنترنت", "warn");
          return;
        }
    dispatch(getAllCategory());
  }, [dispatch]);

  const [id, setID] = useState("0");
  const [name, setName] = useState("");
  const [loading, setloading] = useState(true);

  //get last category state from redux
  const category = useSelector((state) => state.allCategory.category);

  const subcategory = useSelector((state) => state.subCategory.subcategory);
  // on change dropdown menu
  const handelChange = (e) => {
    console.log(e.target.value);
    setID(e.target.value);
  };
  // to save name
  const onChangeName=(e)=>{
    e.persist();
    setName(e.target.value)
  }
  ///////////
  //on save data
  const handelSubmit = async (e) => {
    e.preventDefault();

    if(!navigator.onLine){
        notify("هناك مشكلة في الاتصال بالإنترنت", "warn");
        return;
    }
    if (id === "0") {
      notify("من فضلك اختر القسم الرئيسي", "warn");
      return;
    }
    if (name === "") {
      notify("من فضلك أدخل اسم القسم الفرعي", "warn");
      return;
    }
    setloading(true);
    await dispatch(
      createSubCategory({
        name,
        category: id,
      }),
    );
    setloading(false);
  };
  ////////////////////
  useEffect(() => {
    return () => {
      if (loading === false) {
        setName("");
        setID("0");

        if (subcategory) console.log(subcategory);
        if (subcategory.status === 201) {
          notify("تمت الإضافة بنجاح", "success");
        } else if (
          subcategory === "Error Error: Request failed with status code 400"
        ) {
          notify("هذا الاسم مستخدم بالفعل، اختر اسمًا آخر", "warn");
        } else {
          notify("حدثت مشكلة أثناء الإضافة", "warn");
        }
        setloading(true);
      }
    };
  }, [loading, subcategory]);
  return [id,name,loading,category,subcategory,handelChange,handelSubmit,onChangeName]
};

export default AddSubcategoryhook;
