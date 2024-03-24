import React, { useState, useEffect } from "react";

const useGetData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("custom hook called");
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonResult = await result.json();
    setData(jsonResult);
  };

  return data;
};

export default useGetData;
