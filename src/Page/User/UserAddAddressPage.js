import { Container } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserAddAddress from "../../Components/User/UserAddAddress";

const UserAddAddressPage = () => {
  return (
    <Container className="py-4">
      <div className="acct-shell">
        <UserSideBar />
        <UserAddAddress />
      </div>
    </Container>
  );
};

export default UserAddAddressPage;
