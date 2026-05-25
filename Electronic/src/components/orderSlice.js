import { createSlice } from "@reduxjs/toolkit";
let ordersSlice = createSlice({
  name: "orders", // String value
  initialState: [],

  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Export actions
export let { addOrder } = ordersSlice.actions;

// Export reducer
export default ordersSlice.reducer;
