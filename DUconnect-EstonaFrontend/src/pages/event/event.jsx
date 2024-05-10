import React from "react";
import "./event.css";
import '../../style.scss';
import { Link } from 'react-router-dom';

const EventPage = () => {
    // Sample data for events with image URLs
    const events = [
        { id: 1, title: 'Event 1', imageUrl: 'https://i.ibb.co/N22nbCJ/Du-metro.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 2, title: 'Event 2', imageUrl: 'https://i.ibb.co/CH8K04b/cz.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 3, title: 'Event 3', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 4, title: 'Event 4', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 5, title: 'Event 5', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 6, title: 'Event 6', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 7, title: 'Event 7', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 8, title: 'Event 8', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 9, title: 'Event 9', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
        { id: 10, title: 'Event 10', imageUrl: 'https://i.ibb.co/N7gC0JW/20240207132850-IMG-3948.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.' },
    ];

    return (
        <div className="event-page">
            <header className="event-header">
                <div className="event-header-content">
                    <h1 className="event-title">DU events</h1>
                    <Link to="/CreateEvent" className="Create-Event">Create Event</Link>
                </div>
            </header>

            <main className="event-main">
                <section className="event-list">
                    {events.map(event => (
                        <div key={event.id} className="event-item">
                            <div className="event-image" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
                            <div className="event-content">
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                                <button className="read-more-btn">
                                    <Link to={`/event/${event.id}`} className="read-more-link">Read More</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <footer className="event-footer">
                <p>Explore more events on DU Connect!</p>
            </footer>
        </div>
    );
}

export default EventPage;
