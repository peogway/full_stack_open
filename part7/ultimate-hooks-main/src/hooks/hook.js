import { useEffect, useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { type, value, onChange, reset };
};

export const useResource = (baseUrl) => {
  const [resource, setResource] = useState([]);
  let token = null;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const getAll = () =>
    axios.get(baseUrl).then((response) => {
      setResource(response.data);
      return response.data;
    });

  useEffect(() => {
    getAll();
  }, []);

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    setResource(resource.concat(response.data));
    return response.data;
  };

  const update = async (updatedObject) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(
      `${baseUrl}/${updatedObject.id}`,
      updatedObject,
      config,
    );
    return response.data;
  };

  return [resource, { create }];
};
