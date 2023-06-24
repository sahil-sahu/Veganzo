import { createSlice } from '@reduxjs/toolkit'

function ishere(item , arr){
  let bool = -1;
  arr.forEach((e, i) => {
    if(e.category.id == item.category.id){
      bool = i;
    }
  })
  return bool;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart : [],
  },
  reducers: {
    add: (state, action) => {
      let index = ishere(action.payload,state.cart);
      if(index === -1){
        state.cart.push(action.payload);
      } else{
        state.cart[index].quantity += action.payload.quantity;
      }
      // state.cart = 
    },
    decrement: (state, action) => {
      let i = action.payload.index;
      state.cart[i].quantity += action.payload.quantity;
      if(state.cart[i].quantity == 0)
          state.cart.splice(i, 1);
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, decrement } = cartSlice.actions

export default cartSlice.reducer