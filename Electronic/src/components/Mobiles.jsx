import React, { useState } from "react";
import "./Mobiles.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";

function Mobiles() {
  const mobiles = [
    { id: 1, name: "iPhone 14", desc: "Apple smartphone", price: 70000, img: "/picture-box/mobiles/mob1.jpeg" },
    { id: 2, name: "Samsung S23", desc: "Flagship Android", price: 65000, img: "/picture-box/mobiles/mob2.jpeg" },
    { id: 3, name: "OnePlus 11", desc: "Fast performance", price: 50000, img: "/picture-box/mobiles/mob3.jpeg" },
    { id: 4, name: "Realme GT", desc: "Gaming phone", price: 25000, img: "/picture-box/mobiles/mob4.jpeg" },
    { id: 5, name: "Redmi Note 12", desc: "Budget phone", price: 15000, img: "/picture-box/mobiles/mob5.jpeg" },
    { id: 6, name: "Vivo V27", desc: "Camera phone", price: 30000, img: "/picture-box/mobiles/mob6.jpeg" },
    { id: 7, name: "Oppo Reno 8", desc: "Stylish design", price: 28000, img: "/picture-box/mobiles/mob7.jpeg" },
    { id: 8, name: "iQOO Neo", desc: "High performance", price: 32000, img: "/picture-box/mobiles/mob8.jpeg" },
    { id: 9, name: "Poco X5", desc: "Big battery", price: 18000, img: "/picture-box/mobiles/mob9.jpeg" },
    { id: 10, name: "Moto G73", desc: "Clean Android", price: 20000, img: "/picture-box/mobiles/mob10.jpeg" },
    { id: 11, name: "Nothing Phone 1", desc: "Unique design", price: 35000, img: "/picture-box/mobiles/mob11.jpeg" },
    { id: 12, name: "Asus ROG Phone", desc: "Gaming beast", price: 75000, img: "/picture-box/mobiles/mob12.jpeg" },
  ];

  const itemperpage = 4;

  const totalpages = Math.ceil(mobiles.length / itemperpage);

  const [currentpage, setCurrentpage] = useState(1);

  const lastpage = currentpage * itemperpage;

  const firstpage = lastpage - itemperpage;

  const currentitem = mobiles.slice(firstpage, lastpage);

  const dispatch = useDispatch();

  return (
    <div className="mobile-container">

      <div className="mobile-page">

        <h1 className="mobile-title">
          📱 Explore <span>Mobiles</span>
        </h1>

        <div className="mobile-grid">

          {currentitem.map((item) => (
            <div className="mobile-card" key={item.id}>

              <div className="mobile-img-box">
                <img
                  src={item.img}
                  alt={item.name}
                  className="mobile-img"
                />
              </div>

              <h3>{item.name}</h3>

              <p>{item.desc}</p>

              <h4>₹{item.price}</h4>

              <button
                onClick={() => {
                  dispatch(addToCart(item));

                  toast.success(
                    `🛒 ${item.name} added to cart successfully!`
                  );
                }}
              >
                Add to Cart
              </button>

            </div>
          ))}

        </div>

        <div className="mobile-pagination">

          <button
            onClick={() => setCurrentpage(currentpage - 1)}
            disabled={currentpage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalpages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentpage(index + 1)}
              className={
                currentpage === index + 1
                  ? "mobile-active"
                  : ""
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentpage(currentpage + 1)}
            disabled={currentpage === totalpages}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default Mobiles;