import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart } from "../../../redux/actions/cartActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlistActions";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  useEffect(() => {
    setClick(wishlist && wishlist.find((i) => i._id === data._id));
  }, [wishlist]);

  const decrementCount = () => count > 1 && setCount(count - 1);
  const incrementCount = () => setCount(count + 1);

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else if (data.stock < count) {
      toast.error("Số lượng sản phẩm có hạn!");
    } else {
      dispatch(addToCart({ ...data, qty: count }));
      toast.success("Thêm sản phẩm thành công!");
    }
  };

  const removeFromWishlistHandler = () => {
    setClick(false);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = () => {
    setClick(true);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {data && (
        <div className="fixed inset-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-lg shadow-lg relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() => setOpen(false)}
            />
            <div className="flex flex-col 800px:flex-row">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt="Product"
                  className="transition-transform duration-300 transform hover:scale-105 rounded-lg shadow"
                />
                <div className="flex mt-2 items-center">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex items-center">
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name} text-lg font-semibold`}>{data.shop.name}</h3>
                      <h5 className="pb-3 text-sm">(4.5) Đánh giá</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-black mt-4 rounded-lg h-11 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-800`}
                  onClick={() => {}}
                >
                  <span className="text-white flex items-center">
                    Gửi tin nhắn <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-lg text-red-500 mt-5">
                  ({data.total_sell}) Đã bán
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-5 pr-5">
                <h1 className={`${styles.productTitle} text-2xl font-bold`}>{data.name}</h1>
                <p className="mt-2 text-gray-600">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice} text-xl font-semibold`}>
                    {data.discountPrice} vnd
                  </h4>
                  <h3 className={`${styles.price} line-through text-lg ml-2 text-gray-500`}>
                    {data.originalPrice ? data.originalPrice + " vnd" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex items-center">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer hover:scale-110 transition duration-300"
                        onClick={removeFromWishlistHandler}
                        color="red"
                        title="Xóa khỏi danh sách yêu thích"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer hover:scale-110 transition duration-300"
                        onClick={addToWishlistHandler}
                        title="Thêm vào yêu thích"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-lg h-11 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-800`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Thêm vào giỏ hàng <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
