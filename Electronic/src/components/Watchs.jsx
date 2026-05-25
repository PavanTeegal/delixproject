import React, { useState } from "react";
import "./Watchs.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";

function Watches() {

  const watches = [
    { id: 1, name: "Apple Watch Series 9", price: 45000, img: "/picture-box/watchs/wat1.jpeg" },
    { id: 2, name: "Samsung Galaxy Watch 6", price: 30000, img: "/picture-box/watchs/wat2.jpeg" },
    { id: 3, name: "Noise ColorFit Pro", price: 3000, img: "/picture-box/watchs/wat3.jpeg" },
    { id: 4, name: "Boat Xtend", price: 2500, img: "/picture-box/watchs/wat4.jpeg" },
    { id: 5, name: "Fire-Boltt Ninja", price: 2000, img: "/picture-box/watchs/wat5.jpeg" },
    { id: 6, name: "Amazfit GTS 4", price: 12000, img: "/picture-box/watchs/wat6.jpeg" },
    { id: 7, name: "Fastrack Smartwatch", price: 4000, img: "/picture-box/watchs/wat7.jpeg" },
    { id: 8, name: "Realme Watch 3", price: 3500, img: "/picture-box/watchs/wat8.jpeg" },
    { id: 9, name: "Fitbit Versa 4", price: 18000, img: "/picture-box/watchs/wat9.jpeg" },
    { id: 10, name: "Garmin Venu Sq", price: 22000, img: "/picture-box/watchs/wat10.jpeg" },
    { id: 11, name: "Honor Watch GS 3", price: 15000, img: "/picture-box/watchs/wat11.jpeg" },
    { id: 12, name: "NoiseFit Halo", price: 4500, img: "/picture-box/watchs/wat12.jpeg" },
  ];

  const itemperpage = 4;

  const totalpages = Math.ceil(watches.length / itemperpage);

  const [currentpage, setCurrentpage] = useState(1);

  const lastpage = currentpage * itemperpage;

  const firstpage = lastpage - itemperpage;

  const currentitem = watches.slice(firstpage, lastpage);

  const dispatch = useDispatch();

  return (
    <div className="watch-container">

      <div className="watch-page">

        <h1 className="watch-main-title">
          ⌚ Smart Watches
        </h1>

        <div className="watch-grid">

          {currentitem.map((item) => (
            <div className="watch-card" key={item.id}>

              <div className="watch-img-box">
                <img
                  src={item.img}
                  alt={item.name}
                  className="watch-image"
                />
              </div>

              <h3>{item.name}</h3>

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

        <div className="watch-pagination">

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
                  ? "watch-active"
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

export default Watches;