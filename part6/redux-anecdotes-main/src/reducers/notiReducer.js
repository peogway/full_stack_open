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

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(setNoti(notification));
    setTimeout(() => dispatch(removeNoti()), seconds * 1000);
  };
};

export default notiSlice.reducer;
