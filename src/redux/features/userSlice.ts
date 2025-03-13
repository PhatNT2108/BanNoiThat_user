import { createSlice } from "@reduxjs/toolkit";
import User from "../../model/User";

export const emptyUserState: User = {
  fullName: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",

  initialState: emptyUserState,

  reducers: {
    setUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
