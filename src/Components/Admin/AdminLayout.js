import { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdminTopbar from "./AdminTopbar";

// Full-width Admin application shell (no Bootstrap Container, no shop
// Navbar/Footer — those are hidden on /admin routes in App.js).
// Redux, hooks, routing and API calls underneath are unchanged.
const AdminLayout = ({ section, title, subtitle, actions, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="adm-app">
      {sidebarOpen && (
        <div className="adm-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`adm-sidebar ${sidebarOpen ? "adm-sidebar-open" : ""}`}>
        <AdminSideBar onNavigate={() => setSidebarOpen(false)} />
      </div>

      <div className="adm-main">
        <AdminTopbar
          section={section}
          title={title}
          onMenu={() => setSidebarOpen(true)}
        />
        <div className="adm-content">
          <div className="adm-pagehead">
            <div>
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
            {actions && <div className="adm-pagehead-actions">{actions}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
