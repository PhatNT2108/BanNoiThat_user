import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    carts: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
