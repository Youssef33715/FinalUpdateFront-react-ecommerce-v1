import { Container } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserAllOrders from "../../Components/User/UserAllOrders";

const UserAllOrderPage = () => {
  return (
    <Container className="py-4">
      <div className="acct-shell">
        <UserSideBar />
        <UserAllOrders />
      </div>
    </Container>
  );
};

export default UserAllOrderPage;
