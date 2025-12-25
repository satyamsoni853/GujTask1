import React from "react";
import { useProducts } from "../context/ProductContext";
import { Package, IndianRupee, AlertCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <div
    style={{
      backgroundColor: "var(--bg-card)",
      padding: "1.5rem",
      borderRadius: "1rem",
      border: "1px solid var(--border-color)",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: `${color}20`, // 20% opacity
          padding: "0.75rem",
          borderRadius: "0.75rem",
          color: color,
        }}
      >
        <Icon size={24} />
      </div>
      {subtitle && (
        <span style={{ fontSize: "0.875rem", color: "var(--success-color)" }}>
          {subtitle}
        </span>
      )}
    </div>

    <div>
      <div style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
        {title}
      </div>
    </div>
  </div>
);

const DashboardStats = () => {
  const { filteredProducts: products } = useProducts();

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, p) => sum + Number(p.price) * Number(p.stock),
    0
  );
  const lowStock = products.filter((p) => p.stock < 10).length;
  const categories = [...new Set(products.map((p) => p.category))].length;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h2>Dashboard Overview</h2>
          <p className="page-subtitle">Welcome back to Nexus Admin</p>
        </div>
        <Link to="/products" className="btn btn-primary">
          <Package size={20} />
          <span>Manage Products</span>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="#3b82f6"
          subtitle="+12% from last month"
        />
        <StatCard
          title="Total Inventory Value"
          value={`₹${(totalValue * 83).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          icon={IndianRupee}
          color="#22c55e"
          subtitle="+5% from last month"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStock}
          icon={AlertCircle}
          color="#ef4444"
        />
        <StatCard
          title="Active Categories"
          value={categories}
          icon={TrendingUp}
          color="#a855f7"
        />
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "2rem",
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Pro Tip</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Keep your inventory up to date to ensure accurate tracking. Use the
          filtering options in the Products page to quickly find items.
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;
