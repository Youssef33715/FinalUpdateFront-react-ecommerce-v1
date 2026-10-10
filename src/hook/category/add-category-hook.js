import {useState,useEffect} from "react";
import avatar from "../../images/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../redux/actions/categoryAction";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";

const AddCategoryHook = () => {
  
  const dispatch =useDispatch()
  const [img,setImg] =useState(avatar)
  const [name,setName] =useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setloading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  // to change name state
  const onChangeName =(e)=>{
    e.persist()
     setName(e.target.value);
  }
  //when image change save it
  const onImageChange=(event)=>{
    if(event.target.files && event.target.files[0])
    {
      setImg(URL.createObjectURL(event.target.files[0]))
      setSelectedFile(event.target.files[0]);
    }
  }
  const res = useSelector((state) => state.allCategory.category);

  //save data in database
  const handelSubmit=async(event)=>{
    event.preventDefault();
    if(name==="" || selectedFile===null)
    {
      console.log("من فضلك ادخل البيانات المطلوبة")
      notify("من فضلك ادخل البيانات المطلوبة","warn");
      return;
    }
    const formData =new FormData();
    formData.append("name",name)
    formData.append("image",selectedFile) 

    setloading(true)
    setIsPress(true)

    await dispatch(createCategory(formData))
    setloading(false)
  }
useEffect(()=>{
  if(loading === false){
    setImg(avatar)
    setName("");
    setSelectedFile(null)
    console.log("تمت العملية");
    setloading(true)
    setTimeout(()=> setIsPress(false),1000)
    if(res.status ===201){
      notify('تمت الإضافة بنجاح',"success");
    }
    else{
      notify('حدثت مشكلة أثناء الإضافة',"error");
    }
    }
},[loading])


return [img,name,loading,isPress,handelSubmit,onImageChange,onChangeName]
}

export default AddCategoryHook
