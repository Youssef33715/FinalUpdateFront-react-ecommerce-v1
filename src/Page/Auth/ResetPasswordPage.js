import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPasswordHook from "../../hook/auth/reset-password-hook";

const ResetPasswordPage = () => {
  const[
      password,
      confirmpassword,
      OnChangePassword,
      OnChangeConfirmPassword,
      onSubmit,
    ]=ResetPasswordHook()
  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">ادخل كلمه السر الجديده</label>
          <input
            value={password}
            onChange={OnChangePassword}
            placeholder=" ادخل كلمه السر.الجديده.."
            type="password"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            value={confirmpassword}
            onChange={OnChangeConfirmPassword}
            placeholder=" تاكيد كلمه السر الجديده..."
            type="password"
            className="user-input my-3 text-center mx-auto"
          />
          <button onClick={onSubmit} className="btn-login mx-auto mt-2">
            حفظ
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};
export default ResetPasswordPage;
