import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const latestOrder = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(latestOrder);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        description: "Sunflower",
        amount: {
          currency_code: "USD",
          value: orderData?.totalPrice,
        },
      }],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    }).then((orderId) => orderId);
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      if (payer) {
        paymentHandlerPaypal(payer);
      }
    });
  };

  const paymentHandlerPaypal = async (paymentInfo) => {
    const config = { headers: { "Content-Type": "application/json" } };
    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    try {
      await axios.post(`${server}/order/create-order`, order, config);
      setOpen(false);
      navigate("/order/success");
      toast.success("Đặt hàng thành công!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    } catch (error) {
      toast.error("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  const paymentData = { amount: Math.round(orderData?.totalPrice * 100) };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`${server}/payment/process`, paymentData, config);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card: elements.getElement(CardNumberElement) },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          type: "Thẻ tín dụng",
        };

        await axios.post(`${server}/order/create-order`, order, config);
        setOpen(false);
        navigate("/order/success");
        toast.success("Đặt hàng thành công!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.message || "Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    order.paymentInfo = { type: "Thanh toán khi nhận hàng" };

    try {
      await axios.post(`${server}/order/create-order`, order, config);
      setOpen(false);
      navigate("/order/success");
      toast.success("Đặt hàng thành công!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    } catch (error) {
      toast.error("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8 bg-gray-100">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex bg-white rounded-md shadow-lg p-5">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo  = ({ user, setOpen, onApprove, createOrder, paymentHandler, cashOnDeliveryHandler }) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex flex-col space-y-4">
        {['Thẻ tín dụng', 'PayPal', 'Thanh toán khi nhận hàng'].map((method, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-[25px] h-[25px] rounded-full border-2 cursor-pointer ${select === index + 1 ? 'bg-blue-500' : 'bg-transparent'}`}
              onClick={() => setSelect(index + 1)}
            >
              {select === index + 1 && <div className="w-[13px] h-[13px] bg-white rounded-full" />}
            </div>
            <h4 className="text-lg pl-2 font-semibold">{`Thanh toán bằng ${method}`}</h4>
          </div>
        ))}
      </div>

      {/* Thanh toán bằng thẻ tín dụng */}
      {select === 1 && (
        <form className="mt-4" onSubmit={paymentHandler}>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block pb-2">Tên chủ thẻ</label>
              <input
                required
                value={user?.name}
                className={`${styles.input} w-full`}
              />
            </div>
            <div className="w-1/2">
              <label className="block pb-2">Ngày hết hạn</label>
              <CardExpiryElement className={`${styles.input} w-full`} />
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <label className="block pb-2">Số thẻ</label>
              <CardNumberElement className={`${styles.input} w-full`} />
            </div>
            <div className="w-1/2">
              <label className="block pb-2">CVV</label>
              <CardCvcElement className={`${styles.input} w-full`} />
            </div>
          </div>
          <input
            type="submit"
            value="Xác nhận thanh toán"
            className={`${styles.button} bg-blue-500 text-white h-[45px] mt-4 w-full rounded-md cursor-pointer text-lg font-semibold`}
          />
        </form>
      )}

      {/* Thanh toán bằng PayPal */}
      {select === 2 && (
        <div className="mt-4">
          <button
            className={`${styles.button} bg-blue-500 text-white h-[45px] rounded-md cursor-pointer text-lg font-semibold`}
            onClick={() => setOpen(true)}
          >
            Thanh toán bằng PayPal
          </button>
          {open && (
            <div className="fixed top-0 left-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-center">
              <div className="bg-white p-5 rounded-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">Thanh toán PayPal</h2>
                <PayPalScriptProvider options={{ "client-id": "test" }}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    className="w-full"
                  />
                </PayPalScriptProvider>
                <RxCross1
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Thanh toán khi nhận hàng */}
      {select === 3 && (
        <form className="mt-4" onSubmit={cashOnDeliveryHandler}>
          <input
            type="submit"
            value="Xác nhận đơn hàng"
            className={`${styles.button} bg-blue-500 text-white h-[45px] mt-4 w-full rounded-md cursor-pointer text-lg font-semibold`}
          />
        </form>
      )}
    </div>
  );
};

const CartData = ({ orderData }) => {
  return (
    <div className="bg-[#f8f9fa] p-5 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#2dcc82]">Tóm tắt đơn hàng</h2>
      <div className="flex justify-between border-b py-2">
        <span>Tổng cộng</span>
        <span>{orderData?.totalPrice} VND</span>
      </div>
      <h5 className="text-2xl font-bold text-[#2dcc82] text-end pt-3">
        Tổng: {orderData?.totalPrice} VND
      </h5>
    </div>
  );
};

export default Payment;
