import React, { useState } from "react";
import useGetData from "../Hooks/useGetData";

const Pages = () => {
  const data = useGetData();
  const [currentPage, setCurrentPage] = useState(0);
  if (data.length <= 0) return;

  const dataPerPages = 10;
  const totalPages = Math.ceil(data?.length / dataPerPages);
  const startIndex = currentPage * 10;
  const endIndex = startIndex + dataPerPages;

  const updateTheCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ul>
        {data?.slice(startIndex, endIndex).map((item) => (
          <li key={item?.id}>{item?.title}</li>
        ))}
      </ul>
      <div>
        <button
          type="button"
          disabled={currentPage === 0}
          onClick={() => updateTheCurrentPage(currentPage + 1)}
        >
          Prev
        </button>
        <span>
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index}
              onClick={() => updateTheCurrentPage(index)}
              className={`${
                index === currentPage ? "current-page" : ""
              } page-number`}
            >
              {index + 1}
            </span>
          ))}
        </span>
        <button
          type="button"
          disabled={currentPage === totalPages - 1}
          onClick={() => updateTheCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pages;
