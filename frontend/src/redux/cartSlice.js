import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const currentId = item.productId || item._id;

      const existItem = state.cartItems.find(
        (x) => (x.productId || x._id) === currentId,
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          (x.productId || x._id) === (existItem.productId || existItem._id)
            ? item
            : x,
        );
      } else {
        state.cartItems.push({
          ...item,
          productId: currentId, 
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const targetId = action.payload;

      state.cartItems = state.cartItems.filter(
        (x) => (x.productId || x._id) !== targetId,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
