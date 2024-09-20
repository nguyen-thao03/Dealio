import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Check if the countdown has ended
    if (
      typeof timeLeft.days === "undefined" &&
      typeof timeLeft.hours === "undefined" &&
      typeof timeLeft.minutes === "undefined" &&
      typeof timeLeft.seconds === "undefined" &&
      data?._id
    ) {
      axios
        .delete(`${server}/event/delete-shop-event/${data._id}`)
        .catch((error) => console.error("Error deleting event:", error));
    }

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeLeft, data]); // Dependency array

  function calculateTimeLeft() {
    // Sử dụng định dạng ngày dd/mm/yyyy
    const eventDateString = "18/09/2024";

    // Chuyển đổi chuỗi dd/mm/yyyy thành một đối tượng Date hợp lệ
    const [day, month, year] = eventDateString.split("/");
    const eventDate = new Date(`${year}-${month}-${day}T00:00:00`);

    const difference = eventDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span key={interval} className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Hết thời gian</span>
      )}
    </div>
  );
};

export default CountDown;
