import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noti: "",
  error: "",
};

const notiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {
    setNoti(state, action) {
      return { ...state, noti: action.payload };
    },
    removeNoti(state, action) {
      return { ...state, noti: "" };
    },
    setErrorMessage(state, action) {
      return { ...state, error: action.payload };
    },
    removeError(state, action) {
      return { ...state, error: "" };
    },
  },
});

export const { setNoti, removeNoti, setErrorMessage, removeError } =
  notiSlice.actions;

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(setNoti(notification));
    setTimeout(() => dispatch(removeNoti()), seconds * 1000);
  };
};
export const setError = (notification, seconds) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(notification));
    setTimeout(() => dispatch(removeError()), seconds * 1000);
  };
};

export default notiSlice.reducer;
