import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./Features/Cart/cartSlice";
import userReducer from "./Features/User/userSlice";

export const store = configureStore({
  reducer: {
    cartState: cardReducer,
    userState: userReducer,
  },
});
