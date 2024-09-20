import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/actions/eventActions";
import styles from "../../styles/styles";
import EventCard from "./EventCard";

const Events = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Sự kiện giảm giá</h1>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allEvents &&
              allEvents.map((event) => (
                <EventCard key={event._id} data={event} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
