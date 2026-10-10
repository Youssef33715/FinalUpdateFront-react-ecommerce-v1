import { Container } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserFavoriteProducts from "../../Components/User/UserFavoriteProducts";

const UserFavoriteProductsPage = () => {
  return (
    <Container className="py-4">
      <div className="acct-shell">
        <UserSideBar />
        <UserFavoriteProducts />
      </div>
    </Container>
  );
};

export default UserFavoriteProductsPage;
