
import React from "react";
import Home from "./components/Home";
import Mobiles from "./components/Mobiles";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import Laptops from "./components/Laptops";
import Accessories from "./components/Accessories";
import Watches from "./components/Watchs";
import TV from "./components/Tv";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Icons */

import {
  FaHome,
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaClock,
  FaTv,
  FaShoppingCart,
  FaClipboardList,
  FaUserPlus,
  FaSignInAlt,
  FaEnvelope
} from "react-icons/fa";

import Orders from "./components/Orders";
import Register from "./components/Register";
import Login from "./components/Login";
import Contactus from "./components/Contactus";

function App() {

  let cartitems = useSelector(
    (globalState) => globalState.cart
  );

  let cartQuantity = cartitems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Get logged in user
  let users =
    JSON.parse(localStorage.getItem("loggedInUser"));

    // Logout function
  let logout = () => {

    // Remove logged in user
    localStorage.removeItem("loggedInUser");

    // Refresh page
    window.location.reload();

     window.location.href = "/login";
  };

  

  

  return (
    <>

      <BrowserRouter>

        {/* Navbar */}

        <nav className="navbar">

          <h2 className="logo">
          ⚡DELIX E-STORE
          </h2>

          <ul className="links">

            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>

            <li>
              <Link to="/mobiles">
                <FaMobileAlt /> Mobiles
              </Link>
            </li>

            <li>
              <Link to="/laptops">
                <FaLaptop /> Laptops
              </Link>
            </li>

            <li>
              <Link to="/accessories">
                <FaHeadphones /> Accessories
              </Link>
            </li>

            <li>
              <Link to="/Watchs">
                <FaClock /> Watches
              </Link>
            </li>

            <li>
              <Link to="/Tv">
                <FaTv /> TV
              </Link>
            </li>

            <li>
              <Link to="/orders">
                <FaClipboardList /> Orders
              </Link>
            </li>

            <li>
              <Link to="/register">
                <FaUserPlus /> Register
              </Link>
            </li>
            

            {
  users ? (
    <>
      <li className="welcome-user">
        Welcome {users.name}
      </li>
    </>
  ) : (
    <li>
      <Link to="/login">
        <FaSignInAlt /> Login
      </Link>
    </li>
  )
}

            <li>
              <Link to="/contactus">
                <FaEnvelope /> ContactUs
              </Link>
            </li>

            <li className="cart-link">
              <Link to="/cart">
                <FaShoppingCart />
                Cart ({cartQuantity})
              </Link>
            </li>

            <li>
        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

        
      </li>

          </ul>

        </nav>

        {/* Routes */}

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/mobiles"
            element={<Mobiles />}
          />

          <Route
            path="/laptops"
            element={<Laptops />}
          />

          <Route
            path="/accessories"
            element={<Accessories />}
          />

          <Route
            path="/Watchs"
            element={<Watches />}
          />

          <Route
            path="/Tv"
            element={<TV />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/contactus"
            element={<Contactus />}
          />

        </Routes>

      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1000}
      />

    </>
  );
}

export default App;