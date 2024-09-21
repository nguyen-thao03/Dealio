import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
  className={`relative min-h-screen w-full bg-no-repeat bg-center bg-cover ${styles.normalFlex}`}
  style={{
    backgroundImage:
      "url(https://sahasrayogam.com/wp-content/uploads/2019/10/innerbanner.jpg)",
  }}
>
      <div className={`${styles.section} w-[90%] 800px:w-[60%] text-center`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#ffffff] font-[700] capitalize`}
        >
          Bộ sưu tập trang trí nhà cửa
        </h1>
        <p className="pt-5 text-[16px] font-[Roboto] font-[400] text-[#ffffffba]">
          Những món đồ decor không chỉ làm đẹp cho không gian sống mà còn tạo nên
          bầu không khí tươi mới và tràn đầy năng lượng. <br />
          Cùng khám phá những món đồ trang trí đang được ưa chuộng hiện nay!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5 transition-transform duration-200 hover:scale-105`}>
            <span className="text-[#2dcc82] font-[Roboto] text-[18px]">
              Mua ngay
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
