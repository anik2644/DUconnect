import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate from react-router-dom v6
import './eventdetail.scss';

const EventDetail = () => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate(); // Updated to use useNavigate

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        alert('Form submitted!');
    };

    const goBack = () => {
        navigate('/event'); // Updated to use navigate
    };

    return (
        <div className="event-detail">
            <header className="header">
                <button className="btn-back" onClick={goBack}>Back</button>
                <h1>Summer Concert by DUBS</h1>
                <p>by DUBS Dhaka University</p>
            </header>

            <section className="event-details">
                <div className="event-banner">
                    <img src="https://i.ibb.co/q5cqrDv/pexels-vishnurnair-1105666.jpg" alt="Event Banner" />
                </div>
                <div className="event-info">
                    <div className="date-time-price">
                        <p><strong>Fri, August 18, 2017</strong></p>
                        <p>6:30 PM - 9:30 PM</p>
                        <p>Price: $70 - $120</p>
                    </div>
                    <button className="btn-primary" onClick={toggleForm}>Register for the Event</button>
                </div>

                {showForm && (
                    <div className="registration-form">
                        <h2>Register for the Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>
                            <button type="submit" className="btn-submit">Submit</button>
                        </form>
                    </div>
                )}

                <div className="event-overview">
                    <h2>Event Overview</h2>
                    <p>
                        Join us for an unforgettable night of music and celebration at the annual DUBS Summer Concert! This event, organized by Dhaka University, brings together the best local bands and artists for an evening of live performances, food, and fun.
                    </p>
                    <p>
                        Whether you're a student, alumni, or just a fan of great music, this concert is the perfect way to enjoy the summer evening with friends and family. Expect a night filled with diverse music genres, from rock and pop to classical and folk, performed by some of the most talented musicians in the region.
                    </p>
                    <p>
                        Early bird tickets are available until July 21. A portion of the proceeds will support local charities. The event is open to all ages, and we have made special arrangements to ensure it's a family-friendly environment.
                    </p>
                </div>

                <div className="event-location">
                    <h2>Location</h2>
                    <p>
                        TSC DU<br />
                        Dhaka University, Dhaka, Bangladesh<br />
                        <a href="https://goo.gl/maps/MZt7XX">View Map</a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default EventDetail;
