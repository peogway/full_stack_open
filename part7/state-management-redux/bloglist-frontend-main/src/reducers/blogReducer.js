import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    incBlogLikes(state, action) {
      const id = action.payload;

      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
      ).sort((a, b) => b.likes - a.likes);
    },
    dltBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { createBlog, setBlogs, incBlogLikes, dltBlog } =
  blogSlice.actions;

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blog);
    dispatch(createBlog(newBlog));
  };
};

export const setAllBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.incLike(blog);
    dispatch(incBlogLikes(blog.id));
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.deleteBlog(blogId);
    dispatch(dltBlog(blogId));
  };
};

export default blogSlice.reducer;
