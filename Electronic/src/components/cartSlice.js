import { createSlice } from "@reduxjs/toolkit";



const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
        let existingItem=state.find(item=>item.name===action.payload.name)
        if (existingItem){
            existingItem.quantity+=1;
        }else{
            state.push({...action.payload,quantity:1})
        }
        },

        incQty:(state,action)=>{
            let existingItem=state.find(item=>item.name===action.payload.name)
            if(existingItem){
                existingItem.quantity+=1
            }
        }, 

        removeCart:(state,action)=>{
           let existingItemIndex = state.findIndex(item=>item.name===action.payload.name)
            state.splice(existingItemIndex,1)
        },


        decQty:(state,action)=>{
         let existingitem=state.find(item=>item.name===action.payload.name);
         if(existingitem){
            if(existingitem.quantity>1){
                 existingitem.quantity-=1;
         }
         else{
            let index = state.findIndex(item =>item.name===action.payload.name);
           state.splice(index,1);
         }
        }
    },

        clearCart:()=>[]
    }
})

export const { addToCart,clearCart,incQty,removeCart,decQty }=cartSlice.actions;
export default cartSlice.reducer;