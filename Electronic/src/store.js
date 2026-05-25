import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cartSlice";
import cuponReducer from "./components/cuponSlice"
import ordersReducer from "./components/orderSlice"
const store = configureStore({
    reducer:{
        cart:cartReducer,
        cuponDetails:cuponReducer,
        orders:ordersReducer
    }
})
export default store;
