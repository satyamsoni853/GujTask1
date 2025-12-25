import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import ProductList from "./pages/ProductList";
import DashboardStats from "./pages/DashboardStats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardStats />} />
        <Route path="products" element={<ProductList />} />
      </Route>
    </Routes>
  );
}

export default App;
