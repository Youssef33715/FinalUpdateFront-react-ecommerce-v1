import { Container } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar";
import UserProfile from "../../Components/User/UserProfile";

const UserProfilePage = () => {
  return (
    <Container className="py-4">
      <div className="acct-shell">
        <UserSideBar />
        <UserProfile />
      </div>
    </Container>
  );
};

export default UserProfilePage;
