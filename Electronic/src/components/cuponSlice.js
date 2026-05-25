import { createSlice } from "@reduxjs/toolkit";
import { cupons } from "./cupons";
const cuponSlice = createSlice({
name:"cupon",
initialState:{
    code:"",
    discoun:0,
    applied:false,
    message:"",
},

reducers:{
applyCupon:(state,action) => {
    const finalCuponCode = action.payload.toUpperCase();
      
    if (finalCuponCode in cupons){
        state.code = finalCuponCode;
        state.discoun = cupons[finalCuponCode];
        state.applied = true;
        state.message = `Cupon "${finalCuponCode}" applied! you got ${cupons[finalCuponCode]}% off.`;
    }else{
        state.code = "";
        state.discoun = 0;
        state.applied = false;
        state.message = "Invalid Coupon";

    }

}
}
})

export const {applyCupon} = cuponSlice.actions;
export default cuponSlice.reducer;


