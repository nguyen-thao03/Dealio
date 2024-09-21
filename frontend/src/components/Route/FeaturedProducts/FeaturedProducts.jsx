import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import styles from '../../../styles/styles';

const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    const firstFive = allProducts && allProducts.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  return (
    <div className={`${styles.section} mb-12`}>
    <div className={`${styles.heading} mb-6`}>
      <h1 className="text-2xl font-bold text-[#2dcc82]">Sản phẩm nổi bật</h1>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data && data.map((item, index) => (
        <div className="transition-transform transform hover:scale-105 duration-300" key={index}>
          <ProductCard data={item} />
        </div>
      ))}
    </div>
  </div>
  );
};

export default FeaturedProducts;
