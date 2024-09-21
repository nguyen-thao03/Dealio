import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { backend_url } from "../../../server";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlistActions";
import { addToCart } from "../../../redux/actions/cartActions";
import toast from "react-hot-toast";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setClick(wishlist.some((i) => i._id === data._id));
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(false);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(true);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else if (data.stock < 1) {
      toast.error("Số lượng sản phẩm có hạn!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Thêm sản phẩm thành công!");
    }
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-lg p-3 relative transition-transform transform hover:shadow-xl cursor-pointer">
      <Link to={`/${isEvent ? `product/${data._id}?isEvent=true` : `product/${data._id}`}`}>
        <img
          src={`${backend_url}${data.images[0]}`}
          alt={data.name}
          className="w-full h-[170px] object-contain transition-transform transform"
        />
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        <h4 className="pb-3 font-[500] text-lg">
          {data.name.length > 40 ? `${data.name.slice(0, 40)}...` : data.name}
        </h4>
        <div className="flex">
          <Ratings rating={data.ratings} />
        </div>
        <div className="py-2 flex items-center justify-between ">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice} text-xl`}>
              {data.originalPrice === 0 ? data.originalPrice : data.discountPrice} vnd
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? `${data.originalPrice} vnd` : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#2dcc82]">{data.sold_out} đã bán</span>
        </div>
      </Link>

      {/* Side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            onClick={() => removeFromWishlistHandler(data)}
            className="cursor-pointer absolute right-2 top-5 transition-transform transform hover:scale-110"
            color="red"
            title="Xóa khỏi danh sách yêu thích"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            onClick={() => addToWishlistHandler(data)}
            className="cursor-pointer absolute right-2 top-5 transition-transform transform hover:scale-110"
            color="#333"
            title="Thêm vào yêu thích"
          />
        )}
        <AiOutlineEye
          size={22}
          onClick={() => setOpen(!open)}
          className="cursor-pointer absolute right-2 top-14 transition-transform transform hover:scale-110"
          color="#333"
          title="Xem nhanh"
        />
        <AiOutlineShoppingCart
          size={25}
          onClick={() => addToCartHandler(data._id)}
          className="cursor-pointer absolute right-2 top-24 transition-transform transform hover:scale-110"
          color="#444"
          title="Thêm vào giỏ hàng"
        />
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
