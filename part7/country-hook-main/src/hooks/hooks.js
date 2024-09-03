import { useEffect, useState } from "react";
import axios from "axios";
import Country from "../components/Country";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(
      `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,
    )
      .then((response) => {
        // console.log(response.data);

        setCountry(response.data);
      }).catch((error) => {
        console.error("Error fetching data:", error);
        setCountry(null);
      });
    // console.log(country);
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
