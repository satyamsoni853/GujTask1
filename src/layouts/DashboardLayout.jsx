import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Sidebar Navigation Item Component
 * Renders a single navigation link with an icon and label.
 */
const SidebarItem = ({ to, icon: Icon, label, active, onClick }) => (
  <Link
    to={to}
    className={`nav-item ${active ? "active" : ""}`}
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

/**
 * Main Layout Component
 * Integrates Sidebar, Navbar, and Footer into a cohesive dashboard structure.
 * Handles responsive layout and content positioning.
 */
const DashboardLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/products", icon: Package, label: "Products" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1 className="brand-title">Nexus Admin</h1>
          {/* Close button for mobile inside drawer */}
          <button
            className="btn-icon"
            onClick={closeSidebar}
            style={{
              display: "none",
              "@media (max-width: 768px)": { display: "block" },
            }}
          >
            {/* Only visibile on mobile via CSS if needed, but overlay click is primary */}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <SidebarItem
              key={item.to}
              {...item}
              active={location.pathname === item.to}
              onClick={closeSidebar} // Close drawer on navigation
            />
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="nav-item"
            style={{
              width: "100%",
              justifyContent: "flex-start",
              background: "transparent",
              border: "none",
            }}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="main-content"
        style={{ padding: 0, display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem",
            flex: 1,
            width: "100%",
          }}
        >
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
