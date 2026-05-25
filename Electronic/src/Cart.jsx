import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css';
import { clearCart, decQty, incQty, removeCart } from './components/cartSlice';
import { applyCupon } from './components/cuponSlice';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { QRCodeCanvas } from "qrcode.react"; 
import emailjs from "@emailjs/browser"; 
import { addOrder } from './components/orderSlice';
import { useNavigate } from 'react-router-dom';


function Cart() {

  let cartItems = useSelector(state => state.cart);
  const dispatch=useDispatch();

  const navigate = useNavigate();   // ✅ ADD HERE

  useEffect(() => {                 // ✅ ADD HERE
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      alert("Please login first to access cart");
      navigate("/login");
    }
  }, []);


  let totalAmount = cartItems.reduce((sum,item)=>sum+item.price * item.quantity,0,);
  let [discount,setDiscount]=useState(0);

  let [cupon,setCupon]=useState("");
  let {code,discoun,applied,message}=useSelector(state=>state.cuponDetails);
     
  let  discountAmount = (totalAmount*discount)/100;
  let  couponDiscountAmount =(totalAmount * discoun) / 100;
  let  totalDiscountAmount =discountAmount + couponDiscountAmount;
  let  amountAfterDis = (totalAmount-totalDiscountAmount);
  let  gstAmount =(amountAfterDis * 18) / 100;
  let  netAmount = (amountAfterDis + gstAmount);

  let [paymentMethod,setPaymentMethod]=useState("")

  const [customerMail,setCustomerMail]=useState("")

  const templateParams = {
        orderId: "ORD-" + Math.floor(Math.random() * 1000000000),
        orders: cartItems.map(item => ({
            name: item.name,
            price: (item.price * item.quantity).toFixed(2),
            units: item.quantity
        })),
        cost: {
            shipping: 50,
            tax: gstAmount.toFixed(2),
            total: netAmount.toFixed(2)
        },
        email: customerMail
    };

   let handleCheckout = () => {



    //Create the order detials Object. 
		  let purchaseDetails = {
				orderId: "ORD-" + Math.floor(Math.random() * 1000000000),
				date: new Date().toLocaleString(),
				items: [...cartItems],
				totalPrice: netAmount,
        };

        //dispatch this detials to store 
	   dispatch(addOrder(purchaseDetails));
       dispatch(clearCart()); 
	


        emailjs.send("service_pvn_143",
                     "template_s5oapmh", 
                      templateParams, 
                      "sekqiKSKjvw7Jni6V")
                      .then(() => { alert("✅ Email sent successfully"); })
                      .catch((error) => { alert("❌ Email sending failed:", error); });
    };	

  return (
    <>
    <div className="cart-container">
  <div className="cart-actions">

<button
  className="btn clear-btn"
  onClick={() => {
    Swal.fire({
      title: "Are you sure?",
      text: "All cart items will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());

        Swal.fire(
          "Deleted!",
          "All cart items have been removed.",
          "success"
        );
      }
    });
  }}
>
  ClearAll
</button>
  </div>
{cartItems.length===0?(
  <h3>🛒your cart is empty</h3>
):
        
      <ol className="cart-list">
        {cartItems.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.img} alt='no img'/>
            <span className="name">{item.name}</span>
            <span className="qty">Qty: {item.quantity}</span>
            <span className="price">₹{item.price}</span>

              <div className="qty-controls">
  <button onClick={()=>dispatch(decQty(item))} className="qty-btn minus">−</button>
  <span className="qty-number">{item.quantity}</span>
  <button onClick={()=>dispatch(incQty(item))} className="qty-btn plus">+</button>
</div>

<button
  className="btn clear-btn"
  onClick={() => {
    Swal.fire({
      title: "Are you sure?",
      text: `Item ${item.name} Removed from cart`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Remove !"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCart(item.id));

        
        Swal.fire(
  "Deleted!",
  `Item ${item.name} Removed`,
  "success"
);
      }
    });
  }}
>
  Remove
</button>


          </li>
        ))}
        <div className="discount-section">
  <button onClick={() => setDiscount(10)}>10% OFF</button>
  <button onClick={() => setDiscount(20)}>20% OFF</button>
  <button onClick={() => setDiscount(50)}>50% OFF</button>
        </div>

        <input type='text' placeholder='enter cupon' value={cupon} onChange={(e) => setCupon(e.target.value)}/>
        <button onClick={()=>dispatch(applyCupon
          
      (cupon))}>Apply Cupon</button>
   <p className="message">{message}</p>

<div className="bill-box">

  <div className="bill-row">
    <span>Total Amount</span>
    <span>₹{totalAmount.toFixed(2)}</span>

  </div>

  <div className="bill-row discount-row">
    <span>Discount ({discount}%)</span>
    <span>-₹{discountAmount.toFixed(2)}</span>
  </div>

   <div className="bill-row discount-row">
                <span>Coupon Discount ({discoun}%)</span>
                <span>
                  -₹{couponDiscountAmount.toFixed(2)}
                </span>
              </div>

              <div className="bill-row">
                <span>Total Discount</span>
                <span>
                  -₹{totalDiscountAmount.toFixed(2)}
                </span>
              </div>

  <div className="bill-row gst-row">
    <span>GST (18%)</span>
    <span>₹{gstAmount.toFixed(2)}</span>
  </div>

  <div className="bill-row">
    <span>Price After Discount</span>
    <span>₹{amountAfterDis.toFixed(2)}</span>
  </div>

  <div className="bill-row net-row">
    <span>Net Amount</span>
    <span>₹{netAmount.toFixed(2)}</span>
  </div>

  <div>

<label> 📧 Enter your Gmail to receive order confirmation </label>
		<input
			type="email"
			value={customerMail}
			onChange={(e) => setCustomerMail(e.target.value)}
			placeholder="you@example.com"
		/>
	</div>

</div>
</ol>     
}
</div>
<div className="payment-container">
  <h1 className="title">Select Payment Method</h1>

  <div className="btn-group">
    <button
      className={`pay-btn ${paymentMethod === "QR" ? "active" : ""}`}
      onClick={() => setPaymentMethod("QR")}
    >
      QR Code
    </button>

    <button
      className={`pay-btn ${paymentMethod === "card" ? "active" : ""}`}
      onClick={() => setPaymentMethod("card")}
    >
      Card
    </button>
  </div>

  {paymentMethod === "QR" && (
    <div className="qr-card">
      <h4>Scan UPI QR to pay ₹{netAmount.toFixed(2)}</h4>

      <div className="qr-box">
        <QRCodeCanvas
          value={`upi://pay?pa=8309396628-5@ybl&pn=PavanStore&tr=1234&tn=Payment&am=${netAmount.toFixed(2)}&cu=INR`}
          size={220}
        />
      </div>

      <p className="hint">Open PhonePe / GPay / Paytm and scan</p>
    </div>
  )}

  {paymentMethod=== "card" && (
    <div>
      <h1>Technical isshu</h1>
    </div>
  )}


  <button onClick={handleCheckout}>Checkout & Send Email</button>
</div>
    </>
  )
}
export default Cart;





// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import './Cart.css';

// import {
//   clearCart,
//   decQty,
//   incQty,
//   removeCart
// } from './components/cartSlice';

// import { applyCupon } from './components/cuponSlice';

// function Cart() {

//   let cartItems = useSelector(state => state.cart);

//   const dispatch = useDispatch();

//   // Total Amount
//   let totalAmount = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   // Button Discount
//   let [discount, setDiscount] = useState(0);

//   // Coupon Input
//   let [cupon, setCupon] = useState("");

//   // Coupon Redux State
//   let { code, discoun, applied, message } =
//     useSelector(state => state.cuponDetails);

//   // Button Discount Amount
//   let buttonDiscountAmount =
//     (totalAmount * discount) / 100;

//   // Coupon Discount Amount
//   let couponDiscountAmount =
//     (totalAmount * discoun) / 100;

//   // Total Discount
//   let totalDiscountAmount =
//     buttonDiscountAmount + couponDiscountAmount;

//   // Amount After Discount
//   let amountAfterDis =
//     totalAmount - totalDiscountAmount;

//   // GST
//   let gstAmount =
//     (amountAfterDis * 18) / 100;

//   // Net Amount
//   let netAmount =
//     amountAfterDis + gstAmount;

//   return (
//     <>
//       <div className="cart-container">

//         {/* Clear Button */}
//         <div className="cart-actions">

//           <button
//             className="btn clear-btn"
//             onClick={() => dispatch(clearCart())}
//           >
//             ClearAll
//           </button>

//         </div>

//         {/* Empty Cart */}
//         {cartItems.length === 0 ? (

//           <h3>🛒 your cart is empty</h3>

//         ) : (

//           <ol className="cart-list">

//             {/* Cart Items */}
//             {cartItems.map(item => (

//               <li key={item.id} className="cart-item">

//                 <img src={item.img} alt='no img' />

//                 <span className="name">
//                   {item.name}
//                 </span>

//                 <span className="qty">
//                   Qty: {item.quantity}
//                 </span>

//                 <span className="price">
//                   ₹{item.price}
//                 </span>

//                 {/* Quantity Controls */}
//                 <div className="qty-controls">

//                   <button
//                     onClick={() => dispatch(decQty(item))}
//                     className="qty-btn minus"
//                   >
//                     −
//                   </button>

//                   <span className="qty-number">
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() => dispatch(incQty(item))}
//                     className="qty-btn plus"
//                   >
//                     +
//                   </button>

//                 </div>

//                 {/* Remove Button */}
//                 <button
//                   onClick={() => dispatch(removeCart(item))}
//                   className="btn-remove"
//                 >
//                   Remove
//                 </button>

//               </li>

//             ))}

//             {/* Discount Buttons */}
//             <div className="discount-section">

//               <button onClick={() => setDiscount(10)}>
//                 10% OFF
//               </button>

//               <button onClick={() => setDiscount(20)}>
//                 20% OFF
//               </button>

//               <button onClick={() => setDiscount(50)}>
//                 50% OFF
//               </button>

//             </div>

//             {/* Coupon Input */}
//             <input
//               type='text'
//               placeholder='enter cupon'
//               value={cupon}
//               onChange={(e) => setCupon(e.target.value)}
//             />

//             {/* Apply Coupon */}
//             <button
//               onClick={() => dispatch(applyCupon(cupon))}
//             >
//               Apply Cupon
//             </button>

//             {/* Coupon Message */}
//             <p>{message}</p>

//             {/* Bill Section */}
//             <div className="bill-box">

//               <div className="bill-row">
//                 <span>Total Amount</span>
//                 <span>₹{totalAmount.toFixed(2)}</span>
//               </div>

//               <div className="bill-row discount-row">
//                 <span>Button Discount ({discount}%)</span>
//                 <span>
//                   -₹{buttonDiscountAmount.toFixed(2)}
//                 </span>
//               </div>

//               <div className="bill-row discount-row">
//                 <span>Coupon Discount ({discoun}%)</span>
//                 <span>
//                   -₹{couponDiscountAmount.toFixed(2)}
//                 </span>
//               </div>

//               <div className="bill-row">
//                 <span>Total Discount</span>
//                 <span>
//                   -₹{totalDiscountAmount.toFixed(2)}
//                 </span>
//               </div>

//               <div className="bill-row gst-row">
//                 <span>GST (18%)</span>
//                 <span>₹{gstAmount.toFixed(2)}</span>
//               </div>

//               <div className="bill-row">
//                 <span>Price After Discount</span>
//                 <span>₹{amountAfterDis.toFixed(2)}</span>
//               </div>

//               <div className="bill-row net-row">
//                 <span>Net Amount</span>
//                 <span>₹{netAmount.toFixed(2)}</span>
//               </div>

//             </div>

//           </ol>

//         )}

//       </div>
//     </>
//   )
// }

// export default Cart