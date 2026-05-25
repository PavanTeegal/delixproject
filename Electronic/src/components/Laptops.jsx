// import React, { useState } from "react";
// import "./Laptops.css";
// import { useDispatch } from "react-redux";
// import { addToCart } from "./cartSlice";
// import { toast } from "react-toastify";

// function Laptops() {
//   const laptops = [
//     { id: 1, name: "MacBook Air M2", desc: "Apple lightweight laptop", price: 95000, img: "/picture-box/laptops/lap1.jpeg" },
//     { id: 2, name: "Dell XPS 13", desc: "Premium ultrabook", price: 90000, img: "/picture-box/laptops/lap2.jpeg" },
//     { id: 3, name: "HP Pavilion", desc: "Everyday performance", price: 55000, img: "/picture-box/laptops/lap3.jpeg" },
//     { id: 4, name: "Lenovo ThinkPad", desc: "Business laptop", price: 70000, img: "/picture-box/laptops/lap4.jpeg" },
//     { id: 5, name: "Asus ROG", desc: "Gaming laptop", price: 120000, img: "/picture-box/laptops/lap5.jpeg"},
//     { id: 6, name: "Acer Aspire 7", desc: "Budget gaming", price: 60000, img: "/picture-box/laptops/lap6.jpeg" },
//     { id: 7, name: "MSI GF63", desc: "Slim gaming laptop", price: 75000, img: "/picture-box/laptops/lap7.jpeg" },
//     { id: 8, name: "HP Victus", desc: "Gaming series", price: 80000, img: "/picture-box/laptops/lap8.jpeg" },
//     { id: 9, name: "Lenovo IdeaPad", desc: "Student laptop", price: 45000, img: "/picture-box/laptops/lap9.jpeg" },
//     { id: 10, name: "Asus VivoBook", desc: "Lightweight design", price: 50000, img: "/picture-box/laptops/lap10.jpeg" },
//     { id: 11, name: "Acer Swift 3", desc: "Portable ultrabook", price: 65000, img: "/picture-box/laptops/lap11.jpeg" },
//     { id: 12, name: "Samsung Galaxy Book", desc: "Slim & stylish", price: 85000, img: "/picture-box/laptops/lap12.jpeg" },
//   ];

//   const itemperpage=4;
//   const totalpages=Math.ceil(laptops.length/itemperpage);
//   const [currentpage,setCurrentPage]=useState(1);
//   const lastpage=currentpage*itemperpage;
//   const firstpage=lastpage-itemperpage;
//   const currentitem=laptops.slice(firstpage,lastpage);


//   const dispatch=useDispatch();


//   return (
//     <div>
//     <div className="laptops">
//       <h1 className="title">💻 Laptops</h1>

//       <div className="grid">
//         {currentitem.map((item) => (
//           <div className="card" key={item.id}>
//             <img src={item.img} alt={item.name} className="laptop-img" />

//             <h3>{item.name}</h3>
//             <p>{item.desc}</p>
//             <h4>₹{item.price}</h4>

//             <button onClick={()=>{dispatch(addToCart(item))
//               toast.success(`🛒 ${item.name} add to cart successfully!`)
//             }}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>

//     <div className="pagination">
//   <button 
//     onClick={() => setCurrentPage(currentpage - 1)} 
//     disabled={currentpage === 1}
//   >
//     Prev
//   </button>

//   {Array.from({ length: totalpages }, (_, index) => (
//     <button
//       key={index}
//       onClick={() => setCurrentPage(index + 1)}
//       className={currentpage === index + 1 ? "active1" : ""}
//     >
//       {index + 1}
//     </button>
//   ))}

//   <button 
//     onClick={() => setCurrentPage(currentpage + 1)} 
//     disabled={currentpage === totalpages}
//   >
//     Next
//   </button>
// </div>
//     </div>
//   );
// }

// export default Laptops;



import React, { useState } from "react";
import "./Laptops.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import { toast } from "react-toastify";

function Laptops() {

  const laptops = [
    { id: 1, name: "MacBook Air M2", desc: "Apple lightweight laptop", price: 95000, img: "/picture-box/laptops/lap1.jpeg" },
    { id: 2, name: "Dell XPS 13", desc: "Premium ultrabook", price: 90000, img: "/picture-box/laptops/lap2.jpeg" },
    { id: 3, name: "HP Pavilion", desc: "Everyday performance", price: 55000, img: "/picture-box/laptops/lap3.jpeg" },
    { id: 4, name: "Lenovo ThinkPad", desc: "Business laptop", price: 70000, img: "/picture-box/laptops/lap4.jpeg" },
    { id: 5, name: "Asus ROG", desc: "Gaming laptop", price: 120000, img: "/picture-box/laptops/lap5.jpeg" },
    { id: 6, name: "Acer Aspire 7", desc: "Budget gaming", price: 60000, img: "/picture-box/laptops/lap6.jpeg" },
    { id: 7, name: "MSI GF63", desc: "Slim gaming laptop", price: 75000, img: "/picture-box/laptops/lap7.jpeg" },
    { id: 8, name: "HP Victus", desc: "Gaming series", price: 80000, img: "/picture-box/laptops/lap8.jpeg" },
  ];

  const itemperpage = 4;
  const totalpages = Math.ceil(laptops.length / itemperpage);

  const [currentpage, setCurrentPage] = useState(1);

  const lastpage = currentpage * itemperpage;
  const firstpage = lastpage - itemperpage;

  const currentitem = laptops.slice(firstpage, lastpage);

  const dispatch = useDispatch();

  return (
    <div className="laptop-container">

      <div className="laptop-page">

        <h1 className="laptop-title">
          💻 Laptops
        </h1>

        <div className="laptop-grid">

          {currentitem.map((item) => (
            <div className="laptop-card" key={item.id}>

              <div className="laptop-img-box">
                <img
                  src={item.img}
                  alt={item.name}
                  className="laptop-img"
                />
              </div>

              <h3>{item.name}</h3>

              <p>{item.desc}</p>

              <h4>₹{item.price}</h4>

              <button
                onClick={() => {
                  dispatch(addToCart(item));
                  toast.success(`🛒 ${item.name} added to cart`);
                }}
              >
                Add to Cart
              </button>

            </div>
          ))}

        </div>

        <div className="laptop-pagination">

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
              className={currentpage === index + 1 ? "laptop-active" : ""}
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

export default Laptops;