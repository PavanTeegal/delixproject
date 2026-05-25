import React from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Home() {

  const categories = [
    {
      id: 1,
      name: "Mobiles",
      desc: "Latest 5G smartphones from top brands",
      img: "/picture-box/home/home4.jpg",
    },
    {
      id: 2,
      name: "Laptops",
      desc: "High performance laptops for work & gaming",
      img: "/picture-box/home/home5.jpg",
    },
    {
      id: 3,
      name: "Accessories",
      desc: "Headphones, chargers, smart gadgets & more",
      img: "/picture-box/home/home6.jpg",
    },
  ];

  const featured = [
    {
      id: 1,
      name: "iPhone 14",
      desc: "Apple A15 Bionic chip, Dual camera, Super Retina display",
      price: 70000,
      img: "/picture-box/home/home1.jpg",
    },
    {
      id: 2,
      name: "MacBook Air M2",
      desc: "Apple M2 chip, 13.6-inch Retina display, ultra fast performance",
      price: 95000,
      img: "/picture-box/home/home2.jpg",
    },
    {
      id: 3,
      name: "Boat Rockerz 450 Headphones",
      desc: "Wireless Bluetooth headphones with deep bass & 15hr battery",
      price: 2000,
      img: "/picture-box/home/home3.jpeg",
    },
  ];

  const dispatch = useDispatch();

  return (
    <div className="home-page">

      {/* ===== Marquee ===== */}
      <div className="home-marquee">
        <div className="home-marquee-content">
          🔥 Big Sale! Up to 50% OFF 📱 | Free Delivery 🚚 |
          New Arrivals Every Week ✨ | Best Prices Guaranteed 💰
        </div>
      </div>

      {/* ===== Hero Section ===== */}
      <div className="home-hero">
        <h1>Welcome to Electronics Store 🛒</h1>
        <p>Best gadgets, best prices, best deals</p>
      </div>

      {/* ===== Categories ===== */}
      <h2 className="home-title">Categories</h2>

      <div className="home-grid">
        {categories.map((cat) => (
          <Link
            to={`/${cat.name.toLowerCase()}`}
            key={cat.id}
            className="home-card-link"
          >
            <div className="home-card">
              <img
                src={cat.img}
                alt={cat.name}
                className="home-card-img"
              />

              <h3>{cat.name}</h3>

              <p>{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ===== Featured Products ===== */}
      <h2 className="home-title">Featured Products</h2>

      <div className="home-grid">
        {featured.map((item) => (
          <div className="home-card" key={item.id}>

            <img
              src={item.img}
              alt={item.name}
              className="home-card-img"
            />

            <h3>{item.name}</h3>

            <p>{item.desc}</p>

            <h4>₹{item.price}</h4>

            <button
              className="home-btn"
              onClick={() => {
                dispatch(addToCart(item));

                                toast.success(
                                  `🛒 ${item.name} added to cart successfully!`
                                );
              }}
            >
              Buy Now
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;