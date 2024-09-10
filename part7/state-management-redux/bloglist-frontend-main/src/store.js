import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notiReducer from "./reducers/notiReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    blogs: blogReducer,
    notiReducer,
    user: userReducer,
  },
});
