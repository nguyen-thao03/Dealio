import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchData = useMemo(() => {
    if (!searchTerm || !allProducts) return [];
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allProducts]);

  return (
    <>
      {/* Desktop Header */}
      <div
        className={`sticky top-0 z-10 bg-white shadow-md hidden lg:flex items-center justify-between w-full h-[70px] transition-all duration-300 ${
          active ? "shadow-sm" : ""
        }`}
      >
        <div className={`${styles.section} ${styles.normalFlex} justify-between`}>
          {/* Categories Dropdown */}
          <div
            className="relative h-[60px] mt-[10px] w-[200px] hidden 1000px:block cursor-pointer transition-all duration-300"
            onClick={() => setDropDown((prev) => !prev)}
          >
            <IoMenu size={30} className="absolute top-3 left-2" />
            <button className="h-full w-full flex justify-between items-center pl-10 bg-white text-lg font-[500] rounded-t-md hover:bg-gray-100 transition-colors duration-300">
              Danh mục
            </button>
            <IoIosArrowDown size={20} className="absolute right-2 top-4" />
            {dropDown && (
              <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
            )}
          </div>

          {/* Logo */}
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-full h-12 object-contain" />
          </Link>

          {/* Navbar */}
          <Navbar active={activeHeading} />

          {/* Search Box */}
          <div className="w-[25%] relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[40px] w-full px-2 border-[#2d885d] border-2 rounded-md focus:outline-none focus:border-[#1b6443] transition-all duration-300"
            />
            <AiOutlineSearch size={30} className="absolute right-2 top-1.5 text-gray-500 hover:text-[#2d885d] transition-colors duration-300" />
            {searchTerm && searchData.length > 0 && (
              <div className="absolute min-h-[30vh] bg-white shadow-lg z-[9] p-4">
                {searchData.map((item) => (
                  <Link key={item._id} to={`/product/${item._id}`}>
                    <div className="w-full flex items-start py-3 hover:bg-gray-100 transition-colors duration-300">
                      <img
                        src={`${backend_url}${item.images[0]}`}
                        alt={item.name}
                        className="w-[40px] h-[40px] mr-2 object-cover rounded-md"
                      />
                      <h1>{item.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Create Shop Button */}
          <div className="px-4 py-2 bg-[#2d885d] rounded-md hover:bg-[#1b6443] transition-all duration-300">
            <Link to="/shop-create">
              <h1 className="text-white flex items-center">
                Tạo cửa hàng <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>

          {/* Wishlist & Cart */}
          <div className="flex">
            <div
              className="relative cursor-pointer mr-4 hover:text-[#2dcc82] transition-colors duration-300"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} color="#393E46" />
              <span className="absolute top-0 right-0 bg-[#2dcc82] w-4 h-4 text-center text-[12px] text-black rounded-full">
                {wishlist.length}
              </span>
            </div>
            <div
              className="relative cursor-pointer mr-4 hover:text-[#2dcc82] transition-colors duration-300"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color="#393E46" />
              <span className="absolute top-0 right-0 bg-[#2dcc82] w-4 h-4 text-center text-[12px] text-black rounded-full">
                {cart.length}
              </span>
            </div>

            {/* Profile */}
            <div className="relative cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${backend_url}${user.avatar}`}
                    alt="Hồ sơ"
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} color="#393E46" className="hover:text-[#2dcc82] transition-colors duration-300" />
                </Link>
              )}
            </div>

            {/* Cart & Wishlist Popups */}
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-10 bg-white shadow-md flex items-center justify-between w-full h-[60px]">
        <div className="flex justify-between items-center w-full">
          <IoMenu
            size={30}
            className="ml-4 cursor-pointer"
            onClick={() => setOpenMenu((prev) => !prev)} // Mở/đóng menu
          />
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-16 h-10 object-contain" />
          </Link>
          <div className="relative mr-4">
            <AiOutlineShoppingCart
              size={30}
              onClick={() => setOpenCart(true)} // Mở giỏ hàng
              className="cursor-pointer"
            />
            <span className="absolute top-0 right-0 bg-[#2dcc82] w-4 h-4 text-center text-[12px] text-black rounded-full">
              {cart.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
