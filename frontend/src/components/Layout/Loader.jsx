import React from "react";
import Lottie from "react-lottie";
import animationData from "../../Assests/animations/Animation - 1726343234458.json";

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Lottie options={defaultOptions} width={300} height={300} />
        </div>
    );
};

export default Loader;