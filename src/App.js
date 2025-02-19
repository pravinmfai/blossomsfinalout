import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./frontend/client/styles/ecomstyle.css";

// Components
import LoaderWrapper from "./frontend/client/components/LoaderWrapper";
import Header from "./frontend/client/components/Header";
import OfferDisp from "./frontend/client/components/offerDisp";
import ProductSearchNav from "./frontend/client/components/productSearchNav";
import Footer from "./frontend/client/components/Footer";
import Cart from "./frontend/client/components/Cart";
import Checkout from "./frontend/client/components/Checkout";
import OrderConfirmation from "./frontend/client/components/OrderConfirmation";
// import AuthForm from "./frontend/client/components/AuthForm";
// import ProtectedRoute from "./frontend/client/components/protectedRoute";
import UserPage from "./frontend/client/pages/UserPage";
import AddressPage from "./frontend/client/components/AddressForm";
import Terms from "./frontend/client/pages/Terms";
import Shipping from "./frontend/client/pages/Shipping";
import Refund from "./frontend/client/pages/Refund";
import Privacy from "./frontend/client/pages/Privacy";

// Pages
import HomeComponent1 from "./frontend/client/components/HomePageComponent1";
import TraditionalSarees from "./frontend/client/components/TraditionalSarees";
import TrendingSarees from "./frontend/client/components/TrendingSarees";
import TestimonialSlider from "./frontend/client/components/Testimonials";
import Explcotsaree from "./frontend/client/components/explcotsaree";
import ProductListMPG from "./frontend/client/pages/productListMPG";
import ProductdescMPG from "./frontend/client/pages/productdescMPG";
import AboutUs from "./frontend/client/pages/AboutUs";
import SignUp from "./frontend/client/pages/signup";
import Login from "./frontend/client/pages/login";
import ResetPassword from "./frontend/client/components/resetPasswordVerify";
import ResetPass from "./frontend/client/components/resetPassword";
import SetPassword from "./frontend/client/components/setpassword";
import OrdersListingPage from "./frontend/client/pages/userOrderPage";

import { CartProvider } from "./frontend/client/context/CartContext";
import { AddressProvider } from "./frontend/client/context/AddressContext";
import SareeCategories from "./frontend/client/pages/SareeCategories";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOption, setDropdownOption] = useState("Featured");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDropdownSelect = (option) => {
    setDropdownOption(option);
  };

  return (
    <CartProvider>
      <AddressProvider>
        <Router>
          <LoaderWrapper>
            <div className="app-container">
              <div className="combinedNav">
                <OfferDisp />
                <Header />
              </div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HomeComponent1 />
                      <Explcotsaree />
                      <TraditionalSarees />
                      <TrendingSarees />
                      <SareeCategories />
                      <TestimonialSlider />
                    </>
                  }
                />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route
                  path="/shop/*"
                  element={
                    <div className="productdisp">
                      <ProductSearchNav onSearch={handleSearch} onDropdownSelect={handleDropdownSelect} />
                      <ProductListMPG searchQuery={searchQuery} />
                    </div>
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-verify" element={<ResetPassword />} />
                <Route path="/reset-password" element={<ResetPass />} />
                <Route path="/set-password" element={<SetPassword />} />
                <Route path="/user-orders" element={<OrdersListingPage />} />
                <Route path="/address" element={<AddressPage />} />
              </Routes>
              <Footer />
            </div>
          </LoaderWrapper>
        </Router>
      </AddressProvider>
    </CartProvider>
  );
}

export default App;