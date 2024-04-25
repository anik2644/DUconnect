// EventPage.jsx
import React, { useState, useEffect } from "react";
import "./eventPage.scss";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [highlightedEvent, setHighlightedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    // Fetch event data from API or define locally
    const fetchData = async () => {
      try {
        // Fetch event data from an API endpoint
        const response = await fetch("API_ENDPOINT_URL");
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
          // Extract upcoming events and highlighted event
          const upcoming = data.events.filter((event) => event.date > new Date());
          setUpcomingEvents(upcoming);
          if (upcoming.length > 0) {
            setHighlightedEvent(upcoming[0]);
          }
        } else {
          throw new Error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const handleGetTicket = () => {
    // Handle ticket booking logic here
    // You can open a calendar or any other UI for selecting date and time slot
    // Update selectedDate and selectedTimeSlot state accordingly
  };

  return (
    <div className="event-page">
      {highlightedEvent && (
        <div className="highlighted-event">
          <h2>Upcoming Event</h2>
          <div className="event-details">
            <img src={highlightedEvent.coverPhoto} alt="Event Cover" />
            <div className="description">
              <h3>{highlightedEvent.title}</h3>
              <p>{highlightedEvent.description}</p>
              <button onClick={handleGetTicket}>Get Ticket</button>
            </div>
          </div>
        </div>
      )}
      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="event-list">

        </div>
      </div>
    </div>
  );
};

export default EventPage;
