import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      // Check if the countdown has ended
      if (Object.keys(updatedTimeLeft).length === 0 && data?._id) {
        axios
          .delete(`${server}/event/delete-shop-event/${data._id}`)
          .catch((error) => console.error("Error deleting event:", error));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  function calculateTimeLeft() {
    const eventDateString = "18/09/2024";
    const [day, month, year] = eventDateString.split("/");
    const eventDate = new Date(`${year}-${month}-${day}T00:00:00`);
    const difference = eventDate - new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return {};
  }

  const renderTimerComponents = () => {
    return Object.entries(timeLeft).map(([interval, value]) => {
      if (!value) return null;
      return (
        <div key={interval} className="countdown-item">
          <span className="text-[25px] text-[#475ad2]">
            {value} {interval}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="countdown-container">
      {Object.keys(timeLeft).length > 0 ? (
        renderTimerComponents()
      ) : (
        <span className="countdown-expired text-[24px] text-[#ea3838]">Hết thời gian</span>
      )}
    </div>
  );
};

export default CountDown;
