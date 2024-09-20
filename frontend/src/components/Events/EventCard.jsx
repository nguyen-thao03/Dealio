import React, { useEffect } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Mặt hàng đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Số lượng sản phẩm có hạn!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Mặt hàng được thêm vào giỏ hàng thành công!");
      }
    }
  };

  return (
    <div
      className={`w-full block bg-white rounded-lg shadow-lg ${
        active ? "mb-0" : "mb-12"
      } 
  lg:flex p-4 lg:p-6 transition-all duration-300 ease-in-out`}
    >
      <div className="w-full lg:w-1/2 relative">
        <img
          src={`${backend_url}${data?.images?.[0]}`}
          alt=""
          className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform 
      duration-300 ease-in-out"
        />
        <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md text-sm">
          <span className="font-medium">{data?.sold_out} đã bán</span>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center mt-5 lg:mt-0 lg:pl-6">
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#333] mb-2">
          {data?.name}
        </h2>
        <p className="text-[16px] lg:text-[18px] text-[#555] mb-4 leading-relaxed">
          {data?.description}
        </p>
        <div className="flex py-2 justify-between items-center">
          <div className="flex items-center">
            <h5 className="font-[500] text-[18px] lg:text-[20px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice} VND
            </h5>
            <h5 className="font-bold text-[20px] lg:text-[22px] text-[#333] font-Roboto">
              {data?.discountPrice} VND
            </h5>
          </div>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center space-x-5">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div
              className="bg-[#000000] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#000000] 
        transition-colors duration-300 ease-in-out"
            >
              Xem
            </div>
          </Link>
          <div
            className="bg-[#000000] text-white font-bold px-6 py-2 rounded-lg cursor-pointer 
        hover:bg-[#000000] transition-colors duration-300 ease-in-out"
            onClick={() => addToCartHandler(data)}
          >
            Thêm
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
