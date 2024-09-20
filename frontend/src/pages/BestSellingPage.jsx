import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { getAllProducts } from "../redux/actions/productActions"; // Import action
import Footer from "../components/Layout/Footer";

const BestSellingPage = () => {
  const dispatch = useDispatch(); // Khởi tạo dispatch
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products); // Lấy products từ redux store

  // Dispatch action để lấy tất cả sản phẩm
  useEffect(() => {
    dispatch(getAllProducts()); // Không cần truyền id nếu API không yêu cầu
  }, [dispatch]);

  // Sắp xếp sản phẩm dựa trên số lượng sold_out
  useEffect(() => {
    if (Array.isArray(allProducts)) {
      const sortedProducts = [...allProducts].sort(
        (a, b) => (b.sold_out || 0) - (a.sold_out || 0)
      );
      setData(sortedProducts); // Cập nhật dữ liệu sản phẩm đã được sắp xếp
      window.scrollTo(0, 0);
    }
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.length > 0 ? (
                data.map((product, index) => <ProductCard data={product} key={index} />)
              ) : (
                <p className="text-center">Không có sản phẩm nào.</p>
              )}
            </div>
          </div>
          <Footer/>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
