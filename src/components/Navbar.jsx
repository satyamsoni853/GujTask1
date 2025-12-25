import React from "react";
import { useProducts } from "../context/ProductContext";
import { useTheme } from "../context/ThemeContext";
import { Search, Sun, Moon, Filter } from "lucide-react";

const Navbar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
  } = useProducts();

  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: Mobile Menu Trigger (Hidden for now) or Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Overview
        </h2>
      </div>

      {/* Center: Search & Filter */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flex: 1,
          maxWidth: "600px",
          margin: "0 2rem",
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
            }}
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="form-input"
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>

        <div style={{ position: "relative", minWidth: "180px" }}>
          <Filter
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)",
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: "2.5rem",
              appearance: "none",
              cursor: "pointer",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right: Theme Toggle & Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={toggleTheme}
          className="btn-icon"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(to right, #60a5fa, #a855f7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.875rem",
          }}
        >
          A
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
