import { useEffect, useState } from "react";

const roleLabel = { admin: "مدير النظام", manager: "مشرف", user: "مستخدم" };

const AdminTopbar = ({ section, title, onMenu }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const name = user?.name || "المدير";
  const role = roleLabel[user?.role] || "مدير النظام";

  return (
    <div className="adm-topbar">
      <div className="d-flex align-items-center gap-3">
        <button type="button" className="adm-sb-toggle" onClick={onMenu} aria-label="القائمة">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <div className="adm-crumbs">
          <span>لوحة الإدارة</span>
          {section && (
            <>
              <span className="adm-sep">/</span>
              <span>{section}</span>
            </>
          )}
          <span className="adm-sep">/</span>
          <b>{title}</b>
        </div>
      </div>

      <div className="adm-topright">
        <a href="/" className="adm-storelink">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M14 3h7v7" /><path d="M10 14L21 3" /><path d="M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
          </svg>
          عرض المتجر
        </a>
        <div className="adm-who">
          <div className="adm-av">{name.charAt(0).toUpperCase()}</div>
          <div>
            <div className="adm-nm">{name}</div>
            <div className="adm-rl">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
