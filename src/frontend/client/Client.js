import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/ecomstyle.css";

// Components
import LoaderWrapper from "./components/LoaderWrapper"; // New component to handle loading
import Header from "./components/Header";
import OfferDisp from "./components/offerDisp";
import ProductSearchNav from "./components/productSearchNav";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import AuthForm from "./components/AuthForm";
import ProtectedRoute from "./components/protectedRoute";

// Pages
import HomeComponent1 from "./components/HomePageComponent1";
import TraditionalSarees from "./components/TraditionalSarees";
import TrendingSarees from "./components/TrendingSarees";
import TestimonialSlider from "./components/Testimonials";
import Explcotsaree from "./components/explcotsaree";
import ProductListMPG from "./pages/productListMPG";
import ProductdescMPG from "./pages/productdescMPG";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/adminDashboard";
import AdminLogin from "./pages/adminLogin";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import ResetPassword from "./components/resetPasswordVerify";
import ResetPass from "./components/resetPassword";
import SetPassword from "./components/setpassword";
import OrdersListingPage from "./pages/userOrderPage";

// Admin-related components
import EditProduct from "./components/EditProduct";
import CreateProduct from "./components/CreateProduct";
import OrderList from "./components/OrderList";
import ProductList from "./components/ProductList";

import { CartProvider } from "./context/CartContext";
import { AddressProvider } from "./context/AddressContext";

function Client() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOption, setDropdownOption] = useState("Featured");

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query
  };

  const handleDropdownSelect = (option) => {
    setDropdownOption(option); // Update the selected dropdown option
  };

  return (
    <CartProvider>
      <AddressProvider>
        <LoaderWrapper> {/* Wrap the entire app with LoaderWrapper */}
          <div className="app-container">
            <div className="combinedNav">
              <OfferDisp />
              <Header />
            </div>

            <Routes>
              {/* General user routes */}
              <Route
                path="/"
                element={
                  <>
                    <HomeComponent1 />
                    <Explcotsaree />
                    <TraditionalSarees />
                    <TrendingSarees />
                    <TestimonialSlider />
                  </>
                }
              />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route
                path="/shop/*"
                element={
                  <div className="productdisp">
                    <ProductSearchNav
                      onSearch={handleSearch}
                      onDropdownSelect={handleDropdownSelect}
                    />
                    <Routes>
                      <Route path="/" element={<ProductListMPG searchQuery={searchQuery} />} />
                      <Route path="productdescription" element={<ProductdescMPG />} />
                    </Routes>
                  </div>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />

              {/* Auth and User routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-verify" element={<ResetPassword />} />
              <Route path="/reset-password" element={<ResetPass />} />
              <Route path="/set-password" element={<SetPassword />} />
              <Route path="/user-orders" element={<OrdersListingPage />} />

              {/* Admin routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/orders" element={<OrderList />} />
            </Routes>

            <Footer />
          </div>
        </LoaderWrapper>
      </AddressProvider>
    </CartProvider>
  );
}

export default Client;
