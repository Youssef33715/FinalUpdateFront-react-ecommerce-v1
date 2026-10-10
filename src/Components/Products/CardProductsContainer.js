import ProductCard from "./ProductCard";
import { Row, Container } from "react-bootstrap";
import SubTitle from "../Uitily/SubTitle";
import CardContainerHook from "../../hook/products/card-container-hook";

// Default layout (Home, category, brand pages) is unchanged: bootstrap Row/Col.
// variant="grid" renders a responsive CSS grid (Products / Product Details pages).
// If the parent already has the wishlist ids it can pass `favProd` and no extra
// wishlist request is made.
const ProductsView = ({ title, btntitle, pathText, products, favProd, variant, showAddToCart }) => {
  if (variant === "grid") {
    return (
      <div className="sf-grid">
        {(products || []).map((item, index) => (
          <ProductCard key={item?._id || index} item={item} favProd={favProd} bare showAddToCart={showAddToCart} />
        ))}
      </div>
    );
  }
  return (
    <Container>
      {products && products.length > 0 ? (
        <SubTitle title={title} btntitle={btntitle} pathText={pathText} />
      ) : null}
      <Row className="my-2 d-flex justify-content-between">
        {products && products.length > 0
          ? products.map((item, index) => (
              <ProductCard key={item?._id || index} item={item} favProd={favProd} />
            ))
          : null}
      </Row>
    </Container>
  );
};

const WithWishlist = (props) => {
  const [favProd] = CardContainerHook();
  return <ProductsView {...props} favProd={favProd} />;
};

const CardProductsContainer = (props) =>
  props.favProd ? <ProductsView {...props} /> : <WithWishlist {...props} />;

export default CardProductsContainer;
