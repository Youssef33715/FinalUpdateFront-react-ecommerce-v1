import { Container, Row, Col, Pagination } from "react-bootstrap";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import { useParams } from "react-router-dom";
import ViewAllProductsCategoryHook from "../../hook/products/view-all-products-category-hook";

const ProductByCategory = () => {
    const {id}=useParams()

    const [items, pagination, onPress] = ViewAllProductsCategoryHook(id);
    if(pagination)
        var pageCount =pagination
    else
        pageCount=0
  
  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <Row className="d-flex flex-row">
          <Col sm="12" xs="10" md="11">
            <CardProductsContainer products={items} />
          </Col>
        </Row>
        <Pagination pageCount={pageCount} onPress={onPress} />
      </Container>
    </div>
  );
}

export default ProductByCategory
