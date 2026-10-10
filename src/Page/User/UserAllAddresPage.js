import { Container } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserAllAddress from "../../Components/User/UserAllAddress";

const UserAllAddresPage = () => {
  return (
    <Container className="py-4">
      <div className="acct-shell">
        <UserSideBar />
        <UserAllAddress />
      </div>
    </Container>
  );
};

export default UserAllAddresPage;
