import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ active }) => {
  return (
    <div className={`flex flex-wrap justify-center items-center ${styles.normalFlex}`}>
      {navItems.map((item, index) => (
        <div className="flex" key={index}>
          <Link
            to={item.url}
            className={`${
              active === index + 1
                ? "text-[#2dcc82] font-bold border-b-2 border-[#2dcc82]"
                : "text-black"
            }  mx-4 transition duration-300 hover:text-[#2dcc82] hover:underline cursor-pointer`}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
