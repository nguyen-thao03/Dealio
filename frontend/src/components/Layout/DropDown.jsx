import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="absolute z-30 w-[200px] bg-white rounded-md shadow-lg transition duration-300 ease-in-out">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`flex items-center p-3 cursor-pointer hover:bg-[#f0f0f0] transition duration-200 select-none ${
              styles.normalFlex
            }`}
            onClick={() => submitHandle(i)}
          >
            <h3 className="text-[#333]">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
