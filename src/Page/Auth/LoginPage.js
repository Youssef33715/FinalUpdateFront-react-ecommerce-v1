import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LoginHook from "../../hook/auth/login-hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../images/logo.png";

// Visual redesign only — same LoginHook, same fields, same onSubmit,
// same loading/isPress spinner behavior, same toast notifications,
// same /register and /user/forget-password links.
const LoginPage = () => {
  const [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress] =
    LoginHook();

  return (
    <div className="login-shell">
      <div className="login-brand">
        <div className="login-brand-top">
          <img src={logo} alt="Happy Store" />
          <b>HAPPY STORE</b>
        </div>
        <div className="login-brand-mid">
          <h2>Shop smarter. Everything you love, in one place.</h2>
          <p>Sign in to pick up right where you left off.</p>
          <ul className="login-features">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18" /><path d="M6 6l1 14h10l1-14" /><path d="M9 10v6" /><path d="M15 10v6" />
              </svg>
              Track your orders anytime
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.8 4.6a5 5 0 00-7.1 0L12 6.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 20.3l8.8-8.6a5 5 0 000-7.1z" />
              </svg>
              Save items to your wishlist
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 11-9-9 9 9 0 019 9z" />
              </svg>
              Fast, secure checkout
            </li>
          </ul>
        </div>
        <div className="login-brand-foot">© {new Date().getFullYear()} Happy Store</div>
      </div>

      <div className="login-form-side">
        <div className="login-form-box">
          <div className="login-kick">Welcome back</div>
          <h1 className="login-h">Sign in to your account</h1>
          <p className="login-lede">Enter your details to continue shopping.</p>

          <div className="login-field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              value={email}
              onChange={onChangeEmail}
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              value={password}
              onChange={onChangePassword}
              placeholder="••••••••"
              type="password"
            />
          </div>

          <div className="login-row-between">
            <label className="login-remember">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/user/forget-password" className="login-forgot">
              Forgot password?
            </Link>
          </div>

          <button onClick={onSubmit} className="login-submit">
            {isPress === true && loading === true ? (
              <Spinner animation="border" size="sm" role="status" />
            ) : null}
            Sign In
          </button>

          <div className="login-foot">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
