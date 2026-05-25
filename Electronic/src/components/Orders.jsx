import { useSelector } from "react-redux";
import "./Orders.css";

function Orders() {

  let orders = useSelector(globalState => globalState.orders);

  return (
    <div className="orders-container">

      <h1 className="orders-title">Your Order History</h1>

      {
        orders.length === 0 ? (
          <div className="empty-orders">
            No Orders Found
          </div>
        ) : (

          <ol className="orders-list">

            {
              orders.map((order) => (

                <li className="order-card" key={order.orderId}>

                  <div className="order-header">
                    <p className="order-id">
                      Order ID: {order.orderId}
                    </p>

                    <p className="order-date">
                      {order.date}
                    </p>
                  </div>

                  <ul className="order-items">

                    {
                      order.items.map((item, itemIndex) => (

                        <li className="order-item" key={itemIndex}>

                         
                        <img
                            src={item.img}
                            alt={item.name}
                            width="250px"
                            height="250px"
                            className="order-img"
                        />
                          <h3 className="item-name">
                            {item.name}
                          </h3>

                          <p className="item-price">
                            ${item.price} × {item.quantity}
                          </p>

                        </li>

                      ))
                    }

                  </ul>

                  <div className="order-total">
                    Total: ${order.totalPrice.toFixed(2)}
                  </div>

                </li>

              ))
            }

          </ol>

        )
      }

    </div>
  )
}

export default Orders;