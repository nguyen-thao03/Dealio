import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-20 py-7 bg-white text-black">
        <h1 className="lg:text-4xl text-3xl font-semibold mb-6 md:mb-0 md:w-2/5">
          <span className="text-[#2dcc82]">Đăng ký</span> để nhận thông tin mới{" "}
          <br />
          về sự kiện và ưu đãi
        </h1>
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            required
            placeholder="Nhập email của bạn..."
            className="text-gray-800 w-full sm:w-72 py-2.5 rounded px-2 border border-gray-500 focus:outline-none"
          />
          <button className="bg-[#2dcc82] hover:bg-teal-500 transition duration-300 px-6 py-2 rounded-md text-white mt-2 md:mt-0 md:ml-2">
            Gửi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-16 text-center md:text-left">
        <ul className="flex flex-col items-center">
          <Link to="/">
            <img src="/logo.png" alt="" className="w-full h-12 object-contain mb-4" />
          </Link>
          <div className="flex justify-center space-x-4">
            <AiFillFacebook size={25} className="cursor-pointer hover:text-[#2dcc82] transition duration-300" />
            <AiOutlineTwitter size={25} className="cursor-pointer hover:text-[#2dcc82] transition duration-300" />
            <AiFillInstagram size={25} className="cursor-pointer hover:text-[#2dcc82] transition duration-300" />
            <AiFillYoutube size={25} className="cursor-pointer hover:text-[#2dcc82] transition duration-300" />
          </div>
        </ul>

        <ul>
          <h1 className="mb-1 font-semibold">Công ty</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-400 hover:text-teal-400 transition duration-300 text-sm leading-6" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul>
          <h1 className="mb-1 font-semibold">Cửa hàng</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-400 hover:text-teal-400 transition duration-300 text-sm leading-6" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul>
          <h1 className="mb-1 font-semibold">Hỗ trợ</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-400 hover:text-teal-400 transition duration-300 text-sm leading-6" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
