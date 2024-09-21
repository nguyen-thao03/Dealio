import React from 'react';
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from '../../../styles/styles';

const Categories = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={`${styles.section} hidden sm:block`}>
                <div className="branding my-12 flex flex-wrap justify-between w-full shadow-md bg-white p-6 rounded-lg">
                    {brandingData && brandingData.map((item, index) => (
                        <div className='flex items-start w-1/2 md:w-auto' key={index}>
                            {item.icon}
                            <div className='px-3'>
                                <h3 className='font-bold text-sm md:text-base'>{item.title}</h3>
                                <p className="text-xs md:text-sm text-gray-600">{item.Description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id="categories">
                <h2 className="text-xl font-semibold mb-4 text-[#2dcc82]">Danh mục</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoriesData && categoriesData.map((item) => {
                        const handleSubmit = () => {
                            navigate(`/products?category=${item.title}`);
                        };
                        return (
                            <div
                                className="flex items-center justify-between p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow duration-300"
                                key={item.id}
                                onClick={handleSubmit}
                            >
                                <h5 className={`text-lg font-medium`}>{item.title}</h5>
                                <img
                                    src={item.image_Url}
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="category"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Categories;
