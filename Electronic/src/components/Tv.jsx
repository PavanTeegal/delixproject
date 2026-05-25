import React, { useState } from "react";
import "./Tv.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";

function TV() {

  const tvs = [
    { id: 1, name: "Sony 55'' 4K TV", price: 70000, img: "/picture-box/tv/tv1.jpeg" },
    { id: 2, name: "Samsung Crystal 4K", price: 60000, img: "/picture-box/tv/tv2.jpeg" },
    { id: 3, name: "LG OLED 48''", price: 90000, img: "/picture-box/tv/tv3.jpeg" },
    { id: 4, name: "Mi Smart TV 5X", price: 45000, img: "/picture-box/tv/tv4.jpeg" },
    { id: 5, name: "OnePlus Y Series", price: 40000, img: "/picture-box/tv/tv5.png" },
    { id: 6, name: "Realme Smart TV", price: 35000, img: "/picture-box/tv/tv6.jpeg" },
    { id: 7, name: "TCL QLED 55''", price: 50000, img: "/picture-box/tv/tv7.jpeg" },
    { id: 8, name: "Vu Premium TV", price: 30000, img: "/picture-box/tv/tv8.jpeg" },
    { id: 9, name: "Panasonic 4K TV", price: 55000, img: "/picture-box/tv/tv9.jpeg" },
    { id: 10, name: "Philips Android TV", price: 42000, img: "/picture-box/tv/tv10.jpeg" },
    { id: 11, name: "Kodak Smart TV", price: 25000, img: "/picture-box/tv/tv11.jpg" },
    { id: 12, name: "Hisense 4K TV", price: 38000, img: "/picture-box/tv/tv12.jpeg" },
  ];

  const itemperpage = 4;

  const totalpages = Math.ceil(tvs.length / itemperpage);

  const [currentpage, setCurrentPage] = useState(1);

  const lastpage = currentpage * itemperpage;

  const firstpage = lastpage - itemperpage;

  const currentitem = tvs.slice(firstpage, lastpage);

  const dispatch = useDispatch();

  return (
    <div className="tv-container">

      <div className="tv-page">

        <h1 className="tv-main-title">
          📺 Smart TVs
        </h1>

        <div className="tv-grid">

          {currentitem.map((item) => (
            <div className="tv-card" key={item.id}>

              <div className="tv-img-box">
                <img
                  src={item.img}
                  alt={item.name}
                  className="tv-image"
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

        <div className="tv-pagination">

          <button
            onClick={() => setCurrentPage(currentpage - 1)}
            disabled={currentpage === 1}
          >
            Prev
          </button>

          {Array.from({ length: totalpages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentpage === index + 1
                  ? "tv-active"
                  : ""
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentpage + 1)}
            disabled={currentpage === totalpages}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default TV;