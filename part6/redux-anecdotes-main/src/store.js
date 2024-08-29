import { configureStore } from "@reduxjs/toolkit";
import anecdotReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notiReducer from "./reducers/notiReducer";

export default configureStore({
  reducer: {
    anecdotes: anecdotReducer,
    filter: filterReducer,
    notiReducer: notiReducer,
  },
});
