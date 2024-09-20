import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Bộ sưu tập cho <br /> trang trí nhà cửa
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Đồ decor trang trí nội thất có thể giúp không gian sống thêm tươi mới,
          tràn đầy năng lượng và mang vẻ đẹp cuốn hút. <br />Có những đồ trang trí
          decor nào đang được ưa chuộng trong thời gian này? {" "}
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Mua ngay
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
