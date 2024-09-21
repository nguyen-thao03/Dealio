import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Ratings = ({ rating, size = 20, color = "#f6ba00", onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);
    
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= (hoverRating || rating)) {
            stars.push(
                <AiFillStar
                    key={i}
                    size={size}
                    color={color}
                    className="mr-2 cursor-pointer"
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => onRate && onRate(i)}
                />
            );
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(
                <BsStarHalf
                    key={i}
                    size={size * 0.85}
                    color={color}
                    className="mr-2 cursor-pointer"
                />
            );
        } else {
            stars.push(
                <AiOutlineStar
                    key={i}
                    size={size}
                    color={color}
                    className="mr-2 cursor-pointer"
                />
            );
        }
    }

    return <div className="flex" role="img" aria-label={`Rating: ${rating}`}>{stars}</div>;
};

export default Ratings;
