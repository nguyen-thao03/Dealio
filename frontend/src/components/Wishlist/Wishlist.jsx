import React from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlistActions";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/actions/cartActions";
import toast from "react-hot-toast";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
    toast.success("Thêm sản phẩm thành công!");
  }
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col">
        {wishlist && wishlist.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenWishlist(false)} />
            </div>
            <h5 className="text-xl">Danh sách trống!</h5>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenWishlist(false)} />
            </div>
            <div className={`${styles.normalFlex} p-4 border-b`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-lg font-semibold">{wishlist.length} sản phẩm</h5>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-150px)] border-t">
              {wishlist.map((i, index) => (
                <WishlistItem
                  key={index}
                  data={i}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistItem = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const totalPrice = data.discountPrice;

  return (
    <div className="flex items-center p-4 border-b">
      <RxCross1
        className="cursor-pointer text-red-500"
        onClick={() => removeFromWishlistHandler(data)}
      />
      <img
        src={`${backend_url}${data?.images[0]}`}
        alt={data.name}
        className="w-[100px] h-[100px] object-cover ml-2 mr-3 rounded-md"
      />
      <div className="flex-1 pl-2">
        <h1 className="font-semibold text-xl">{data.name}</h1>
        <h4 className="font-semibold text-lg text-[#2dcc82]">{totalPrice} vnd</h4>
      </div>
      <BsCartPlus
        size={20}
        className="cursor-pointer text-[#2dcc82]"
        title="Thêm vào giỏ hàng"
        onClick={() => addToCartHandler(data)}
      />
    </div>
  );
};

export default Wishlist;
