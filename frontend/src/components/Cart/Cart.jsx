import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import toast from "react-hot-toast";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-lg p-5">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <RxCross1
              size={25}
              className="cursor-pointer absolute top-3 right-3"
              onClick={() => setOpenCart(false)}
            />
            <h5 className="text-lg font-semibold text-[#2dcc82]">
              Giỏ hàng trống!
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} style={{ color: "#2dcc82" }} />
                <h5 className="pl-2 text-xl font-semibold text-[#2dcc82]">
                  {cart.length} mặt hàng
                </h5>
              </div>
              <div className="w-full border-t mt-2">
                {cart.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-full bg-[#2dcc82] rounded-md">
                  <h1 className="text-white text-lg font-semibold">
                    Thanh toán ngay ({totalPrice} vnd)
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Số lượng sản phẩm có hạn!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    if (value > 1) {
      setValue(value - 1);
      const updateCartData = { ...data, qty: value - 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  return (
    <div className="border-b p-4">
      <div className="flex items-center">
        <div className="flex items-center">
          <div
            className={`bg-[#2dcc82] border border-[#43e4a473] rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="px-2">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt={data.name}
          className="w-[80px] h-[80px] object-cover ml-2 mr-2 rounded-md"
        />
        <div className="pl-2 flex-1">
          <h1 className="font-semibold text-base">{data.name}</h1>
          <h4 className="font-normal text-sm text-[#00000082]">
            {data.discountPrice} vnd * {data.qty}
          </h4>
          <h4 className="font-semibold text-lg pt-1 text-[#2dcc82]">
            {totalPrice} vnd
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer text-[#e44343]"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
