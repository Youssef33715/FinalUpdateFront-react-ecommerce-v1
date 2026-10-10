import ProductGallery from "./ProductGallery";
import ProductText from "./ProductText";

const ProductDetalis = ({ item, images, cat, brand, favProd }) => {
  return (
    <>
      <div className="sf-product">
        <ProductGallery images={images} />
        <ProductText item={item} cat={cat} brand={brand} favProd={favProd} />
      </div>
      {item?.description ? (
        <section className="sf-section">
          <h2 className="sf-section-title">الوصف</h2>
          <p className="sf-desc">{item.description}</p>
        </section>
      ) : null}
    </>
  );
};

export default ProductDetalis;
