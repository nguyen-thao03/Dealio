import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import  toast  from "react-hot-toast";

const ShopLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${server}/shop/login-shop`,
                { email, password },
                { withCredentials: true }
            );
            toast.success("Login Success!");
            navigate("/dashboard");
            window.location.reload(true); // You might want to reconsider reloading the page
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Đăng nhập Shop
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                                Email
                            </label>
                            <div className='mt-1'>
                                <input
                                    type="email"
                                    name='email'
                                    id='email'
                                    autoComplete='email'
                                    required
                                    placeholder='Please enter a valid email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                />
                            </div>
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                                Mật khẩu
                            </label>
                            <div className='mt-1 relative'>
                                <input
                                    type={visible ? "text" : "password"}
                                    name='password'
                                    id='password'
                                    autoComplete='current-password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>
                        {/* Remember Me and Forgot Password */}
                        <div className={`${styles.normalFlex} justify-between`}>
                            <div className={`${styles.normalFlex}`}>
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Nhớ tài khoản
                                </label>
                            </div>
                            <div className='text-sm'>
                                <Link
                                    to="/forgot-password"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Chưa có tài khoản?</h4>
                            <Link to="/shop-create" className="text-blue-600 pl-2">
                                Đăng ký
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopLogin;
