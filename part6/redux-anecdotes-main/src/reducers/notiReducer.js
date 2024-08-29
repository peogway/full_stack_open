import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    setNoti(state, action) {
      return action.payload;
    },
    removeNoti() {
      return "";
    },
  },
});

export const { setNoti, removeNoti } = notiSlice.actions;
export default notiSlice.reducer;
