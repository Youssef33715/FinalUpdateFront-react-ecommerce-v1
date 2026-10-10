import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import ProductDetalis from "../../Components/Products/ProductDetalis";
import RateCountainer from "../../Components/Rate/RateCountainer";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import VeiwProductDetailsHook from "../../hook/products/veiw-products-details-hook";
import CardContainerHook from "../../hook/products/card-container-hook";

const ProductDetailsView = ({ id }) => {
  const [item, images, cat, brand, related, status] = VeiwProductDetailsHook(id);
  const [favProd] = CardContainerHook(); // one wishlist request for the heart and the related cards

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sf-page sf-details-page" style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        {status === "loading" ? (
          <div className="sf-state">جاري تحميل المنتج...</div>
        ) : status === "missing" ? (
          <div className="sf-state">
            <div className="sf-state-t">هذا المنتج غير موجود</div>
            <div className="sf-state-d">ربما تم حذفه أو أن الرابط غير صحيح</div>
            <Link to="/products" className="sf-btn sf-btn-inline">تصفّح المنتجات</Link>
          </div>
        ) : (
          <>
            <nav className="sf-breadcrumb" aria-label="مسار التصفح">
              <Link to="/products">المنتجات</Link>
              {cat?.name ? (
                <>
                  <span>›</span>
                  {cat._id ? <Link to={`/products/category/${cat._id}`}>{cat.name}</Link> : <span>{cat.name}</span>}
                </>
              ) : null}
              <span>›</span>
              <b>{item.title}</b>
            </nav>
            <ProductDetalis item={item} images={images} cat={cat} brand={brand} favProd={favProd} />
            <RateCountainer rateAvg={item.ratingsAverage} rateQty={item.ratingsQuantity} />
            {related.length > 0 ? (
              <section className="sf-section sf-related">
                <h2 className="sf-section-title">منتجات قد تعجبك</h2>
                <CardProductsContainer variant="grid" products={related} favProd={favProd} />
              </section>
            ) : null}
          </>
        )}
      </Container>
    </div>
  );
};

const ProductDetalisPage = () => {
  const { id } = useParams();
  // keyed by id: opening another product (e.g. from "related") remounts everything
  return <ProductDetailsView key={id} id={id} />;
};

export default ProductDetalisPage;
