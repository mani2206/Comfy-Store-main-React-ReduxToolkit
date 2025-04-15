import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Default State
const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

// getting initial state from the local storage
const getCartFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("cart")) || defaultState;

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    // Add new products
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.amount * product.price;
      cartSlice.caseReducers.calculateTotal(state);
      toast.success("item added to cart");
    },

    // Clear out the cart
    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },

    // Remove products
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.amount * product.price;
      cartSlice.caseReducers.calculateTotal(state);
      toast.success("Item removed from cart");
    },

    // Edit an existing item
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - product.amount;
      state.cartTotal += product.price * (amount - product.amount);
      cartSlice.caseReducers.calculateTotal(state);
      product.amount = amount;
      toast.success("Cart updated");
    },

    // Common Reducer
    calculateTotal: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.shipping + state.tax + state.cartTotal;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const selectAllPost = (state) =>state.defaultState

export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;
export default cartSlice.reducer;
