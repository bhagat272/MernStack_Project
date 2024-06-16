// App.jsx
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reg from "./components/Reg";
import Login from "./components/Login";
import Products from "./components/Products";
import Admin from "./components/Admin/Admin";
import ResponsiveAppBar from "./components/Navbar";
import StickyFooter from "./components/Footer";
import Productsadd from "./components/Admin/Productsadd";
import Productsform from "./components/Admin/Productsform";
import Updateform from "./components/Admin/Updateform";
import Deleteproduct from "./components/Admin/Deleteproduct";
import QueryForm from "./components/Admin/QueryForm";
import Query from "./components/Admin/Query";
import QueryEmailForm from "./components/Admin/QueryEmailForm";
import User from "./components/Admin/User";
import Querydelete from "./components/Admin/Querydelete";
import Cart from "./components/Cart"; // Import Cart component

// Create contexts for user and cart
export const UserContext = createContext(null);
export const CartContext = createContext(null);

function App() {
  const [loginName, setLoginName] = useState(localStorage.getItem("loginName"));
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <UserContext.Provider value={{ loginName, setLoginName }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" element={<Reg />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/productsadd" element={<Productsadd />} />
              <Route path="/productsform" element={<Productsform />} />
              <Route path="/updateform/:id" element={<Updateform />} />
              <Route path="/deleteproduct/:id" element={<Deleteproduct />} />
              <Route path="/querydelete/:id" element={<Querydelete />} />
              <Route path="/queryform" element={<QueryForm />} />
              <Route path="/query" element={<Query />} />
              <Route path="/queryemail/:id" element={<QueryEmailForm />} />
              <Route path="/user" element={<User />} />
              <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
            </Routes>
            <StickyFooter />
          </BrowserRouter>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
