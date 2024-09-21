import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import toast from "react-hot-toast";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [coupounCode, setCoupounCode] = useState("");
  const [coupounCodeData, setCoupounCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [userInfo, setUserInfo] = useState(false); // Khai báo ở đây
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePaymentSubmit = () => {
    if (!address1 || !address2 || !country || !city) {
      toast.error("Vui lòng chọn địa chỉ giao hàng!");
      return;
    }

    const shippingAddress = { address1, address2, country, city };
    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1; // 10%

  const handleCouponSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${server}/coupoun/get-coupoun-value/${coupounCode}`
      );
      const { shopId, value } = response.data.coupounCode || {};

      if (shopId) {
        const isCouponValid = cart.some((item) => item.shopId === shopId);
        if (!isCouponValid) {
          toast.error("Mã giảm giá không hợp lệ");
          setCoupounCode("");
        } else {
          const eligiblePrice = cart.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discount = (eligiblePrice * value) / 100;
          setDiscountPrice(discount);
          setCoupounCodeData(response.data.coupounCode);
          setCoupounCode("");
        }
      } else {
        toast.error("Mã giảm giá không tồn tại!");
        setCoupounCode("");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  const totalPrice = (subTotalPrice + shipping - discountPrice).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] flex flex-col 800px:flex-row">
        <ShippingInfo
          user={user}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          userInfo={userInfo} // Truyền userInfo
          setUserInfo={setUserInfo} // Truyền setUserInfo
        />
        <CartData
          handleCouponSubmit={handleCouponSubmit}
          totalPrice={totalPrice}
          shipping={shipping.toFixed(2)}
          subTotalPrice={subTotalPrice}
          coupounCode={coupounCode}
          setCoupounCode={setCoupounCode}
          discountPrice={discountPrice}
        />
      </div>
      <button
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={handlePaymentSubmit}
      >
        <h5 className="text-[#2dcc82] text-xl">Thanh toán</h5>
      </button>
    </div>
  );
};

const ShippingInfo = ({
    user,
    country,
    setCountry,
    city,
    setCity,
    address1,
    setAddress1,
    address2,
    setAddress2,
  }) => {
    const [useSavedAddress, setUseSavedAddress] = useState(false); // Biến trạng thái
  
    const handleCheckboxChange = (item) => {
      if (useSavedAddress) {
        setAddress1(item.address1);
        setAddress2(item.address2);
        setCountry(item.country);
        setCity(item.city);
      } else {
        // Nếu không chọn, reset tất cả
        setAddress1("");
        setAddress2("");
        setCountry("");
        setCity("");
      }
    };
  
    return (
      <div className="w-full 800px:w-[65%] bg-white rounded-md p-5 pb-8 shadow-lg">
        <h5 className="text-[18px] font-[500] text-[#2dcc82]">Địa chỉ giao hàng</h5>
        <form>
          <div className="flex flex-col md:flex-row">
            <InputField label="Tên" value={user?.name} />
            <InputField label="Email" type="email" value={user?.email} />
          </div>
          <InputField
            label="Số điện thoại"
            type="number"
            value={user?.phoneNumber}
          />
          <div className="flex flex-col md:flex-row">
            <SelectField
              label="Khu vực"
              options={Country.getAllCountries()}
              value={country}
              setValue={setCountry}
            />
            <SelectField
              label="Thành phố"
              options={State.getStatesOfCountry(country)}
              value={city}
              setValue={setCity}
            />
          </div>
          <InputField label="Địa chỉ 1" value={address1} setValue={setAddress1} />
          <InputField label="Địa chỉ 2" value={address2} setValue={setAddress2} />
        </form>
        <h5
          className="text-[18px] cursor-pointer inline-block"
          onClick={() => {
            setUseSavedAddress(!useSavedAddress);
            // Nếu bỏ chọn, reset địa chỉ
            if (useSavedAddress) {
              setAddress1("");
              setAddress2("");
              setCountry("");
              setCity("");
            }
          }}
        >
          Chọn từ địa chỉ đã lưu
        </h5>
        {useSavedAddress && (
          <div>
            {user &&
              user.addresses.map((item, index) => (
                <div key={index} className="w-full flex mt-1">
                  <input
                    type="checkbox"
                    className="mr-3"
                    onClick={() => handleCheckboxChange(item)} // Sử dụng hàm xử lý mới
                  />
                  <h2>{item.addressType}</h2>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };
  

const InputField = ({ label, type = "text", value, setValue }) => (
  <div className="flex-1 p-2">
    <label className="block pb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className={`${styles.input} w-full`}
      required
    />
  </div>
);

const SelectField = ({ label, options, value, setValue }) => (
  <div className="flex-1 p-2">
    <label className="block pb-2">{label}</label>
    <select
      className="w-full border h-[40px] rounded-[5px]"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="">Chọn {label.toLowerCase()}</option>
      {options.map((item) => (
        <option key={item.isoCode} value={item.isoCode}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

const CartData = ({
  handleCouponSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  coupounCode,
  setCoupounCode,
  discountPrice,
}) => {
  return (
    <div className="w-full 800px:w-[35%] bg-[#fff] rounded-md p-5 pb-8 shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-[16px] text-[#000000a4]">Tổng phụ:</h3>
        <h5 className="text-[18px] font-[600]">{subTotalPrice} vnd</h5>
      </div>
      <div className="flex justify-between">
        <h3 className="text-[16px] text-[#000000a4]">Vận chuyển:</h3>
        <h5 className="text-[18px] font-[600]">{shipping} vnd</h5>
      </div>
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] text-[#000000a4]">Giảm giá:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPrice.toFixed(2)} vnd
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">{totalPrice} vnd</h5>
      <form onSubmit={handleCouponSubmit} className="mt-4">
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Nhập mã giảm giá..."
          value={coupounCode}
          onChange={(e) => setCoupounCode(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full h-[40px] border border-[#2dcc82] text-center text-[#2dcc82] rounded-[3px] mt-2`}
        >
          Áp dụng mã
        </button>
      </form>
    </div>
  );
};

export default Checkout;
