import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/productActions";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { getAllEventsShop } from "../../redux/actions/eventActions";

const ShopProfileData = ({ isOwner }) => {
  const { allProducts } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const { id } = useParams();

  console.log("Products:", allProducts); // Thêm dòng này
  console.log("Events:", events);     // Thêm dòng này

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id)).then((response) => {
      console.log("Product API Response:", response);
    });
    dispatch(getAllEventsShop(seller._id)).then((response) => {
      console.log("Event API Response:", response);
    });
  }, [dispatch, seller._id]);

  const [active, setActive] = useState(1);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Sản phẩm
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Sự kiện đang diễn ra
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Đánh giá shop
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Đến bảng điều khiển</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />

      {active === 1 && (
        <div className="w-full">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {allProducts &&
            allProducts.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
         {allProducts && allProducts.length === 0 && (
          <h5 className="w-full text-center py-5 text-[18px]">
            Không có sản phẩm nào cho cửa hàng này!
          </h5>
        )}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {events && events.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              Không có sự kiện nào cho cửa hàng này!
            </h5>
          )}
        </div>
      )}

      {/* Shop reviews */}
      {active === 3 && (
        <div className="w-full">
          <h5 className="w-full text-center py-5 text-[18px]">
            Không có đánh giá nào cho cửa hàng này!
          </h5>
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
