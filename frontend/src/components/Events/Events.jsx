import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/actions/eventActions";
import EventCard from "./EventCard";

const Events = () => {
  const dispatch = useDispatch();
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true);
    }
  }, [isLoading]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2dcc82' }}>Sự kiện giảm giá</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Đang tải sự kiện...</p>
        </div>
      ) : (
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in'
          }}
        >
          {allEvents && allEvents.length > 0 ? (
            allEvents.map((event) => (
              <div
                key={event._id}
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <EventCard data={event} style={{ width: '100%', height: '100%' }} /> 
              </div>
            ))
          ) : (
            <p className="text-center">Không có sự kiện nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;
