import React, { useState } from 'react';
import './event.scss';
import { Link } from 'react-router-dom';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', imageUrl: '', description: '', date: '' });
    const [errorMessage, setErrorMessage] = useState('');

    // Default list of events using the default list of articles
    const defaultEvents = [
        { id: 1, title: 'Code Samurai', imageUrl: 'https://i.ibb.co/KVjnwHT/code.png', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.', date: '2024-05-15' },
        { id: 2, title: 'CCharity for Cancer', imageUrl: 'https://i.ibb.co/Qkzpgns/charity.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.', date: '2024-05-20' },
        { id: 3, title: 'DUBS Concert ', imageUrl: 'https://i.ibb.co/q5cqrDv/pexels-vishnurnair-1105666.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.', date: '2024-05-25' },
        { id: 4, title: 'Save DU 4', imageUrl: 'https://i.ibb.co/N7VXdxV/save.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et felis justo.', date: '2024-05-30' },
    ];

    // Set default events on component mount
    useState(() => {
        setEvents(defaultEvents);
    }, []);

    const handleAddEvent = () => {
        if (!newEvent.title.trim() || !newEvent.imageUrl.trim() || !newEvent.description.trim() || !newEvent.date.trim()) {
            setErrorMessage('Please provide title, image URL, description, and date.');
            return;
        }

        const newId = events.length + 1;
        setEvents([...events, { id: newId, ...newEvent }]);
        setShowModal(false);
        setNewEvent({ title: '', imageUrl: '', description: '', date: '' });
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setNewEvent({ ...newEvent, imageUrl: reader.result });
        };

        reader.readAsDataURL(file);
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="event-page">
            <header className="event-header">
                <div className="event-header-content">
                    <h1 className="event-title">Events</h1>
                </div>
                <button onClick={() => setShowModal(true)} className="create-event-btn">Create Event</button>
            </header>

            <main className="event-main">
                <section className="cover-event">
                    <div className="rectangle">
                        <div className="cover-photo">
                            <img src="https://i.ibb.co/q5cqrDv/pexels-vishnurnair-1105666.jpg" alt="Cover Photo" />
                        </div>
                        <div className="cover-details">
                            <h2>DU Amra-Band Show</h2>
                            <p>As anticipation builds for their upcoming performance on Saturday, fans eagerly await the chance to experience the magic of DU Amra Band live. Whether it's their soul-stirring vocals, intricate instrumental solos, or infectious beats, attendees can expect an unforgettable evening filled with music, laughter, and memories to cherish.</p>
                            <p>Date:24-05-2024</p>
                            <button className="book-event-btn">Book Now</button>
                        </div>
                    </div>
                </section>

                <section className="upcoming-events">
                    <h2>Upcoming Events</h2>
                    <div className="event-list">
                        {events.map(event => (
                            <div key={event.id} className="event-item">
                                <div className="event-image" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
                                <div className="event-content">
                                    <h3>{event.title}</h3>
                                    <p>{event.description}</p>
                                    <button className="read-more-btn">
                                        <Link to={`/event/${event.id}`} className="read-more-link">Read More</Link>
                                    </button>
                                    <button className="delete-event-btn" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {showModal && (
                <div className="create-event-modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setShowModal(false)}>X</span>
                        <h2>Create New Event</h2>
                        <form onSubmit={handleAddEvent}>
                            <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} placeholder="Event Title" />
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                            <textarea name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Description"></textarea>
                            <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} placeholder="Event Date" />
                            <button type="submit">Create</button>
                        </form>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventPage;