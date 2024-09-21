import React from 'react';
import styles from '../../styles/styles';

const CheckoutSteps = ({ active }) => {
    return (
        <div className='w-full flex justify-center mb-8'>
            <div className="w-[90%] 800px:w-[50%] flex items-center justify-between">
                <Step
                    number={1}
                    title="Vận chuyển"
                    isActive={active >= 1}
                />
                <StepDivider isActive={active > 1} />
                <Step
                    number={2}
                    title="Thanh toán"
                    isActive={active >= 2}
                />
                <StepDivider isActive={active > 2} />
                <Step
                    number={3}
                    title="Thành công"
                    isActive={active >= 3}
                />
            </div>
        </div>
    );
};

const Step = ({ number, title, isActive }) => {
    return (
        <div className={`${styles.normalFlex} flex-col items-center`}>
            <div className={`${styles.cart_button} ${isActive ? 'bg-[#2dcc82]' : 'bg-[#95eac3]'} transition duration-300`}>
                <span className={`${styles.cart_button_text} ${isActive ? 'text-white' : 'text-white'}`}>
                    {number}. {title}
                </span>
            </div>
        </div>
    );
};

const StepDivider = ({ isActive }) => {
    return (
        <div className={`w-[30px] 800px:w-[70px] h-[4px] ${isActive ? '!bg-[#2dcc82]' : '!bg-[#95eac3]'} transition duration-300`} />
    );
};

export default CheckoutSteps;
