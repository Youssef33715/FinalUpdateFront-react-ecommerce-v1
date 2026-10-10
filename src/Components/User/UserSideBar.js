import { NavLink, useLocation } from "react-router-dom";

// Same real routes as before (/user/allorders, /user/favoriteproducts,
// /user/addresses, /user/profile) — just restyled and grouped. Orders,
// Wishlist and Addresses pages are not redesigned yet, so they'll simply
// render this sidebar inside their existing layout until they are.
const links = [
  {
    group: "المشتريات",
    items: [
      {
        to: "/user/allorders",
        label: "طلباتي",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3 6h18" /><path d="M6 6l1 14h10l1-14" /><path d="M9 10v6" /><path d="M15 10v6" />
          </svg>
        ),
      },
      {
        to: "/user/favoriteproducts",
        label: "المفضلة",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M20.8 4.6a5 5 0 00-7.1 0L12 6.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 20.3l8.8-8.6a5 5 0 000-7.1z" />
          </svg>
        ),
      },
      {
        to: "/user/addresses",
        label: "عناويني",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "حسابي",
    items: [
      {
        to: "/user/profile",
        label: "الملف الشخصي",
        icon: (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        ),
      },
    ],
  },
];

// Add/Edit address pages belong to the "عناويني" section, so keep it active there.
const isItemActive = (itemTo, pathname) => {
  if (itemTo === "/user/addresses") {
    return (
      pathname === itemTo ||
      pathname === "/user/add-address" ||
      pathname.startsWith("/user/edit-address/")
    );
  }
  return pathname === itemTo;
};

const UserSideBar = () => {
  const location = useLocation();
  let storedUser = null;
  try {
    storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  } catch (e) {
    storedUser = null;
  }
  const displayName = storedUser?.name || "حسابي";
  const initial = displayName.charAt(0).toUpperCase();

  // Same logout behavior already used by NavBarLogin (clear session, go home).
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="acct-side">
      <div className="acct-side-user">
        <div className="acct-av">{initial}</div>
        <div>
          <b>{displayName}</b>
          {storedUser?.email && <span>{storedUser.email}</span>}
        </div>
      </div>

      {links.map((group) => (
        <div key={group.group} style={{ width: "100%" }}>
          <div className="acct-side-eyebrow">{group.group}</div>
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={() =>
                "acct-side-item" + (isItemActive(item.to, location.pathname) ? " active" : "")
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="acct-side-spacer" />

      <button type="button" className="acct-side-item danger" onClick={logOut}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
        </svg>
        تسجيل الخروج
      </button>
    </div>
  );
};

export default UserSideBar;
