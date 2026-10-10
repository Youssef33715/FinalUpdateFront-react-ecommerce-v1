import { Link } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";

import add from "../../images/add.png";
import { CompactPicker } from "react-color";
import AdminImageInput from "./AdminImageInput";
import { ToastContainer } from "react-toastify";

import { useParams } from "react-router-dom";
import AdminEditProductsHook from "../../hook/products/edit-products-hook";

// Same hook, same handlers, same fields as before — the form is only
// regrouped into logical sections for a management-style layout.
const AdminEditProducts = () => {
  const { id } = useParams();

  const [
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
  ] = AdminEditProductsHook(id);

  return (
    <div>
      <div className="adm-formbar">
        <button onClick={handleSubmit} className="adm-btn">حفظ التعديلات</button>
        <Link to="/admin/allproducts" className="adm-btn-outline">إلغاء</Link>
      </div>
      <div className="adm-formgrid">
        <div>
          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">المعلومات الأساسية</div></div>
            <label className="adm-lbl">اسم المنتج</label>
            <input
              value={prodName}
              onChange={onChangeProdName}
              type="text"
              className="input-form d-block px-3 mb-3"
              placeholder="مثال: حذاء رياضي رجالي"
            />
            <label className="adm-lbl">وصف المنتج</label>
            <textarea
              className="input-form-area p-2"
              rows="4"
              placeholder="اكتب وصفًا واضحًا للمنتج..."
              value={prodDescription}
              onChange={onChangeDesName}
            />
          </div>

          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">صور المنتج</div></div>
            <label className="adm-lbl">صور المنتج (حتى 4 صور)</label>
            <AdminImageInput
              images={images}
              setImages={setImages}
              theme={"light"}
              allowCrop={false}
              max={4}
            />
          </div>

          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">التصنيف</div></div>
            <div className="adm-row2">
              <div>
                <label className="adm-lbl">القسم</label>
                <select
                  name="cat"
                  value={CatID}
                  onChange={onSelectCategory}
                  className="select input-form-area px-2"
                >
                  <option value="0">اختر القسم</option>
                  {category.data
                    ? category.data.map((item) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                      ))
                    : null}
                </select>
              </div>
              <div>
                <label className="adm-lbl">العلامة التجارية</label>
                <select
                  name="brand"
                  value={BrandID}
                  onChange={onSelectBrand}
                  className="select input-form-area px-2"
                >
                  <option value="0">اختر العلامة التجارية</option>
                  {brand.data
                    ? brand.data.map((item) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                      ))
                    : null}
                </select>
              </div>
            </div>
            <label className="adm-lbl mt-3">الأقسام الفرعية</label>
            <Multiselect
              className="text-end"
              placeholder="اختر الأقسام الفرعية"
              options={options}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
              emptyRecordMsg="لا توجد خيارات متاحة"
              style={{ color: "red" }}
            />
          </div>
        </div>

        <div>
          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">التسعير</div></div>
            <label className="adm-lbl">السعر (ج.م)</label>
            <input
              type="number"
              className="input-form d-block px-3 mb-3"
              placeholder="0"
              value={priceBefore}
              onChange={onChangePriceBefore}
            />
            <label className="adm-lbl">السعر بعد الخصم (ج.م)</label>
            <input
              type="number"
              className="input-form d-block px-3"
              placeholder="اختياري"
              value={priceAfter}
              onChange={onChangePriceAfter}
            />
          </div>

          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">المخزون</div></div>
            <label className="adm-lbl">الكمية المتاحة</label>
            <input
              type="number"
              className="input-form d-block px-3"
              placeholder="0"
              value={qty}
              onChange={onChangeQty}
            />
          </div>

          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">الخيارات</div></div>
            <label className="adm-lbl">الألوان المتاحة (اضغط على اللون لحذفه)</label>
            <div className="mt-1 d-flex flex-wrap align-items-center">
              {colors.length >= 1
                ? colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => removeColor(color)}
                      className="color ms-2 border mt-1"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))
                : null}
              <img
                onClick={onChangeColor}
                src={add}
                alt="إضافة لون"
                width="30px"
                height="35px"
                style={{ cursor: "pointer" }}
              />
              {showColor === true ? (
                <CompactPicker onChange={handleChangeComplete} />
              ) : null}
            </div>
          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminEditProducts;
