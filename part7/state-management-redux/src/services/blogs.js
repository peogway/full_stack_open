import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";
let token = null;

const setToken = (newToken) => token = `Bearer ${newToken}`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (body) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, body, config);

  return response.data;
};

const incLike = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    ...blog,
    likes: blog.likes + 1,
  }, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, setToken, addBlog, incLike, deleteBlog };
