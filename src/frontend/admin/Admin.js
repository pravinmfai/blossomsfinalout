import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import CreateProduct from "./components/CreateProduct";
import OrderList from "./components/OrderList";
import Dashboard from "./components/Dashboard";
import './admin.css'

function Admin() {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/admin" element={<ProductList />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Admin;
