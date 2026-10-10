import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

// English labels, grouped like a real management system. Every link points
// to a page that actually exists and is backed by a real backend endpoint.
const links = [
  {
    group: "نظرة عامة",
    items: [
      {
        to: "/admin/dashboard",
        label: "لوحة التحكم",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "الكتالوج",
    items: [
      {
        to: "/admin/allproducts",
        label: "المنتجات",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" />
          </svg>
        ),
      },
      {
        to: "/admin/addproduct",
        label: "إضافة منتج",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 5v14M5 12h14" />
          </svg>
        ),
      },
      {
        to: "/admin/addcategory",
        label: "الأقسام",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" />
          </svg>
        ),
      },
      {
        to: "/admin/addsubcategory",
        label: "الأقسام الفرعية",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 4h6v6H4V4z" /><path d="M14 4h6v6h-6V4z" /><path d="M4 14h6v6H4v-6z" />
          </svg>
        ),
      },
      {
        to: "/admin/addbrand",
        label: "العلامات التجارية",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "المبيعات",
    items: [
      {
        to: "/admin/allorders",
        label: "الطلبات",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 6h18" /><path d="M6 6l1 14h10l1-14" /><path d="M9 10v6" /><path d="M15 10v6" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "العملاء",
    items: [
      {
        to: "/admin/users",
        label: "المستخدمين",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" /><circle cx="10" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "التسويق",
    items: [
      {
        to: "/admin/addcoupon",
        label: "الكوبونات",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z" /><path d="M9 12l1.8 1.8L15 10" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "المحتوى",
    items: [
      {
        to: "/admin/reviews",
        label: "التقييمات",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 17.3l-5.4 3 1-6-4.6-4 6-.7L12 3l2.9 5.6 6 .7-4.6 4 1 6z" />
          </svg>
        ),
      },
    ],
  },
];

const AdminSideBar = ({ onNavigate }) => {
  // Replicates NavBarLogin's exact logOut behavior (same localStorage keys,
  // same redirect to "/"), since NavBarLogin itself is hidden on admin
  // routes and is otherwise the only place logout used to live.
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="adm-sb-brand">
        <img src={logo} alt="logo" />
        <div>
          <span>لوحة الإدارة</span>
          <small>HAPPY STORE</small>
        </div>
      </div>

      <div className="adm-sb-body">
        {links.map((group) => (
          <div key={group.group}>
            <div className="adm-sb-group">{group.group}</div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  "adm-sb-item" + (isActive ? " active" : "")
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <button type="button" className="adm-sb-foot" onClick={logOut}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
        </svg>
        تسجيل الخروج
      </button>
    </div>
  );
};

export default AdminSideBar;
