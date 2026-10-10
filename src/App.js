import HomePage from "./Page/Home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Uitily/Footer";
import NavBarLogin from "./Components/Uitily/NavBarLogin";
import LoginPage from "./Page/Auth/LoginPage";
import RegisterPage from "./Page/Auth/RegisterPage";
import AllCategoryPage from "./Page/Category/AllCategoryPage";
import AllBrandPage from "./Page/Brand/AllBrandPage";
import ShopProductsPage from "./Page/Products/ShopProductsPage";
import ProductDetalisPage from "./Page/Products/ProductDetalisPage";
import CartPage from "./Page/Cart/CartPage";
import ChoosePayMethoudPage from "./Page/Checkout/ChoosePayMethoudPage";
import AdminAllProductsPage from "./Page/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Page/Admin/AdminAllOrdersPage";
import AdminOrderDetailsPage from "./Page/Admin/AdminOrderDetailsPage";
import AdminAddBrandPage from "./Page/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage";
import AdminAddSubCategory from "./Page/Admin/AdminAddSubCategory";
import AdminAddProductsPage from "./Page/Admin/AdminAddProductsPage";
import AdminDashboardPage from "./Page/Admin/AdminDashboardPage";
import AdminUsersPage from "./Page/Admin/AdminUsersPage";
import AdminReviewsPage from "./Page/Admin/AdminReviewsPage";
import UserAllOrderPage from "./Page/User/UserAllOrderPage";
import UserFavoriteProductsPage from "./Page/User/UserFavoriteProductsPage";
import UserAllAddresPage from "./Page/User/UserAllAddresPage";
import UserAddAddressPage from "./Page/User/UserAddAddressPage";
import UserEditAddressPage from "./Page/User/UserEditAddressPage";
import UserProfilePage from "./Page/User/UserProfilePage";
import AdminEditProductsPage from "./Page/Admin/AdminEditProductsPage";
import ForgetPasswordPage from "./Page/Auth/ForgetPasswordPage";
import VerifyPasswordPage from "./Page/Auth/VerifyPasswordPage";
import ResetPasswordPage from "./Page/Auth/ResetPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAddCouponPage from "./Page/Admin/AdminAddCouponPage";
import AdminEditCouponPage from "./Page/Admin/AdminEditCouponPage";
import ProtectedRouteHook from "./hook/auth/protected-route-hook";
import ProtectedRoute from "./Components/Uitily/protectedRoute";
import ProductByCategory from "./Page/Products/productByCategory";
import ProductsByBrand from "./Page/Products/ProductsByBrand";
function App() {
  const [isUser, isAdmin, userData] = ProtectedRouteHook()
  // Admin routes get their own app shell (AdminLayout) and must NOT show the
  // shop's customer navbar/footer. Navigation in this project is href-based
  // (full page loads, not client-side <Link>), so NavBarLogin/Footer are
  // rendered outside <BrowserRouter> already — window.location.pathname is a
  // safe, correct way to detect an admin route on every real page load.
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  // Login is a dedicated auth screen — hide only the customer Navbar there
  // (Footer stays, per request). NavBarLogin itself is untouched; this is
  // the same window.location.pathname pattern already used for /admin.
  const isLoginRoute = window.location.pathname === "/login";

  return (
    <div className="font">
      {!isAdminRoute && !isLoginRoute && <NavBarLogin />}
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrandPage />} />
          <Route path="/products" element={<ShopProductsPage />} />
          <Route path="/products/:id" element={<ProductDetalisPage />} />
          <Route
            path="/user/forget-password"
            element={<ForgetPasswordPage />}
          />
          <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
          <Route path="/user/reset-password" element={<ResetPasswordPage />} />
          <Route path="/products/category/:id"element={<ProductByCategory />}/>
          <Route path="/products/brand/:id" element={<ProductsByBrand />} />
          
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order/paymethoud"
            element={
              <ProtectedRoute auth={isUser}>
                <ChoosePayMethoudPage />
              </ProtectedRoute>
            }
          />
          */ ////////////////////////////////////*/
          <Route element={<ProtectedRoute auth={isAdmin} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/reviews" element={<AdminReviewsPage />} />
            <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
            <Route
              path="/admin/allproducts"
              element={<AdminAllProductsPage />}
            />
            <Route path="/admin/addcoupon" element={<AdminAddCouponPage />} />
            <Route
              path="/admin/editcoupon/:id"
              element={<AdminEditCouponPage />}
            />
            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetailsPage />}
            />
            <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
            <Route
              path="admin/addcategory"
              element={<AdminAddCategoryPage />}
            />
            <Route
              path="/admin/addsubcategory"
              element={<AdminAddSubCategory />}
            />
            <Route
              path="/admin/addproduct"
              element={<AdminAddProductsPage />}
            />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProductsPage />}
            />
          </Route>
          *///////////////////*/
          <Route element={<ProtectedRoute auth={isUser} />}>
            <Route path="/user/allorders" element={<UserAllOrderPage />} />
            <Route
              path="/user/favoriteproducts"
              element={<UserFavoriteProductsPage />}
            />
            <Route path="/user/addresses" element={<UserAllAddresPage />} />
            <Route path="user/add-address" element={<UserAddAddressPage />} />
            <Route
              path="user/edit-address/:id"
              element={<UserEditAddressPage />}
            />
            <Route path="user/profile" element={<UserProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {!isAdminRoute && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
