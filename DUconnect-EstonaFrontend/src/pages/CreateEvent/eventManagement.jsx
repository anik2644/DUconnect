import React, { useState } from 'react';
import '../../style.scss';
import './eventManagement.css'; // Import CSS file

function EventManagementSystem() {
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    time: '',
    title: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!newEvent.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!newEvent.location.trim()) {
      errors.location = 'Location is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!newEvent.name.trim()) {
      alert('Name is required');
      return;
    }
    if (!newEvent.location.trim()) {
      alert('Location is required');
      return;
    }

    // Construct the data object to send to the backend
    const eventData = {
      name: newEvent.name,
      location: newEvent.location,
      time: newEvent.time,
      title: newEvent.title,
      description: newEvent.description
    };

    // Log event data to console
    console.log('Event Info:', eventData);

    try {
      const response = await fetch('http://localhost:8000/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        alert('Event created successfully');
      } else {
        const errorData = await response.json();
        alert(`Event creation failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="container">
      <h1>Event Management</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
          />
          {errors.location && <span>{errors.location}</span>}
        </div>
        <div>
          <label>Time:</label>
          <input
            type="text"
            name="time"
            value={newEvent.time}
            onChange={handleInputChange}
          />
          {errors.time && <span>{errors.time}</span>}
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventManagementSystem;
