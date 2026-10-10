import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";
import ViewSearchProductsHook from "../products/veiw-search-products-hook";

const SiderSearchHook = () => {
  const [items, pagination, onPress, getProduct, results] = ViewSearchProductsHook();
  const dispatch = useDispatch();
  // when first load
  useEffect(() => {
    const get=async()=>{
        await dispatch(getAllCategory());
        await dispatch(getAllBrand());
    }
    get()
  }, []);
  // to get state from redux
  const allcat = useSelector((state) => state.allCategory.category);
  const allBrand = useSelector((state) => state.allbrand.brand);
  // to get category
  let category = [];
  if (allcat.data) 
    category = allcat.data;
  // to get brand
  let brand = [];
  if (allBrand.data) 
    brand = allBrand.data;

  var queryCat="",queryBrand=""
  const [cateChecked,setcateChecked]=useState([])
  // when user press any category
  const clickCategory=(e)=>{
    let value=e.target.value
    if(value ==="0")
    {
      setcateChecked([])
    }
    else{
      if(e.target.checked===true){
        setcateChecked([...cateChecked,value])
      }else if(e.target.checked === false){
        const newArry = cateChecked.filter((e) => e !== value);
        setcateChecked(newArry);

      }
    }
  }
////////////////////////
  useEffect(()=>{

    queryCat = cateChecked.map(val => "category[in][]=" + val).join("&");
    console.log("cateChecked:", cateChecked);
    console.log("queryCat:", JSON.stringify(queryCat));

    localStorage.setItem("cateChecked", queryCat);
    setTimeout(() => {
      getProduct();
    }, 1000);
  },[cateChecked])

  const [brandChecked, setBrandChecked] = useState([]);
  // when user press any category
  const clickBrand = (e) => {
    let value = e.target.value;
    if (value === "0") {
      setBrandChecked([]);
    } else {
      if (e.target.checked === true) {
        setBrandChecked([...brandChecked, value]);
      } else if (e.target.checked === false) {
        const newArry = brandChecked.filter((e) => e !== value);
        setBrandChecked(newArry);
      }
    }
  };
  useEffect(() => {
    queryBrand = brandChecked.map(val => "brand[in][]=" + val).join("&");
    localStorage.setItem("brandChecked", queryBrand);
    setTimeout(() => {
      getProduct();
    }, 1000);
  }, [brandChecked]);
  
  const [From,setpriceFrom]=useState(0)
  const [To,setpriceTo]=useState(0)
  const priceFrom=(e)=>{
    localStorage.setItem("priceFrom", e.target.value);
    setpriceFrom(e.target.value);
  }
  const priceTo = (e) => {
      localStorage.setItem("priceTo", e.target.value);
      setpriceTo(e.target.value);
    };
  useEffect(()=>{
    setTimeout(() => {
      getProduct();
        }, 1000);
  },[From,To])  

  return [category, brand, clickCategory, clickBrand, priceFrom, priceTo];
};;

export default SiderSearchHook
