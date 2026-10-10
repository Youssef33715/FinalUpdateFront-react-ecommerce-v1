import { Container } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserEditAddress from "../../Components/User/UserEditAddress";

const UserEditAddressPage = () => {
  return (
    <Container className="py-4">
      <div className="acct-shell">
        <UserSideBar />
        <UserEditAddress />
      </div>
    </Container>
  );
};

export default UserEditAddressPage;
