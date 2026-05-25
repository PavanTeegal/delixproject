import React, { useState } from "react";
import "./Accessories.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";

function Accessories() {

  const accessories = [
    { id: 1, name: "Keyboard", desc: "Mechanical keyboard", price: 1500, img: "/picture-box/accessories/acc1.jpeg" },
    { id: 2, name: "Mouse", desc: "Wireless mouse", price: 800, img: "/picture-box/accessories/acc2.jpeg" },
    { id: 3, name: "Headphones", desc: "Noise cancelling", price: 2000, img: "/picture-box/accessories/acc3.jpeg" },
    { id: 4, name: "Charger", desc: "Fast charger", price: 1200, img: "/picture-box/accessories/acc4.jpeg" },
    { id: 5, name: "USB Cable", desc: "Type-C cable", price: 300, img: "/picture-box/accessories/acc5.jpeg" },
    { id: 6, name: "Power Bank", desc: "10000mAh battery", price: 1500, img: "/picture-box/accessories/acc6.jpeg" },
    { id: 7, name: "Laptop Stand", desc: "Adjustable stand", price: 1000, img: "/picture-box/accessories/acc7.jpeg" },
    { id: 8, name: "Cooling Pad", desc: "Laptop cooling pad", price: 1800, img: "/picture-box/accessories/acc8.jpeg" },
    { id: 9, name: "Webcam", desc: "HD webcam", price: 2500, img: "/picture-box/accessories/acc9.jpeg" },
    { id: 10, name: "Microphone", desc: "USB mic", price: 3000, img: "/picture-box/accessories/acc10.jpeg" },
    { id: 11, name: "Earbuds", desc: "Wireless earbuds", price: 2200, img: "/picture-box/accessories/acc11.jpeg" },
    { id: 12, name: "HDMI Cable", desc: "4K support cable", price: 500, img: "/picture-box/accessories/acc12.jpeg" },
  ];

  const itemperpage = 4;

  const totalpages = Math.ceil(accessories.length / itemperpage);

  const [currentpage, setCurrentPage] = useState(1);

  const lastpage = currentpage * itemperpage;

  const firstpage = lastpage - itemperpage;

  const currentitem = accessories.slice(firstpage, lastpage);

  const dispatch = useDispatch();

  return (
    <div className="accessory-container">

      <div className="accessory-page">

        <h1 className="accessory-title">
          ⌨ Accessories
        </h1>

        <div className="accessory-grid">

          {currentitem.map((item) => (
            <div className="accessory-card" key={item.id}>

              <div className="accessory-img-box">
                <img
                  src={item.img}
                  alt={item.name}
                  className="accessory-image"
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

        <div className="accessory-pagination">

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
                  ? "accessory-active"
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

export default Accessories;