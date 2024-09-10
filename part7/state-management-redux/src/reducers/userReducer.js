import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const setUserFn = (user) => {
  return (dispatch) => {
    dispatch(setUser(user));
  };
};

export const rmUserFn = () => {
  return (dispatch) => dispatch(removeUser());
};

export default userSlice.reducer;
