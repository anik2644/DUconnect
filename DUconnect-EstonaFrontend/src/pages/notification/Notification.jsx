import React, { useState, useEffect } from 'react';
import './notification.scss'; // Import your custom SCSS file for styling

const NotificationPage = () => {
    const [activeNotification, setActiveNotification] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const notifications = [
        {
            type: 'new-message',
            icon: 'fas fa-envelope',
            heading: 'New Message',
            description: 'You have received a new message from John Doe.',
            time: '2 hours ago',
            sender: 'John Doe',
            message: 'Hey, how are you? Just checking in!'
        },
        {
            type: 'urgent-alert',
            icon: 'fas fa-exclamation-triangle',
            heading: 'Urgent Alert',
            description: 'Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.',
            time: 'Yesterday',
            sender: 'System',
            message: 'Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.'
        },
        {
            type: 'new-follower',
            icon: 'fas fa-user-plus',
            heading: 'New Follower',
            description: 'You have a new follower: Jane Smith.',
            time: '3 hours ago',
            sender: 'Jane Smith',
            message: 'Jane Smith is now following you.'
        },
        {
            type: 'event-reminder',
            icon: 'far fa-calendar-alt',
            heading: 'Event Reminder',
            description: "Don't forget: Today is your anniversary with Robert Johnson.",
            time: 'Today',
            sender: 'Calendar',
            message: "Don't forget: Today is your anniversary with Robert Johnson."
        },
        {
            type: 'new-comment',
            icon: 'fas fa-comment',
            heading: 'New Comment',
            description: 'John Doe commented on your post.',
            time: '4 hours ago',
            sender: 'John Doe',
            message: 'Great post! Really enjoyed reading it.'
        },
        {
            type: 'promotion',
            icon: 'fas fa-tags',
            heading: 'Promotion',
            description: 'Limited-time offer: Get 20% off your next purchase!',
            time: 'Today',
            sender: 'Promo Team',
            message: 'Limited-time offer: Get 20% off your next purchase!'
        }
    ];

    const handleNotificationClick = (index) => {
        setActiveNotification(index);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setActiveNotification(null);
    };

    const handleClickOutside = (event) => {
        if (event.target.closest('.notification-item') === null && event.target.closest('.notification-modal') === null) {
            setActiveNotification(null);
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="notification-page">
            <h1 className="notification-title">Notifications</h1>
            <div className="notification-list">
                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className={`notification-item ${notification.type} ${activeNotification === index ? 'active' : ''}`}
                        onClick={() => handleNotificationClick(index)}
                    >
                        <div className="notification-icon">
                            <i className={notification.icon}></i>
                        </div>
                        <div className="notification-content">
                            <h3 className="notification-heading">{notification.heading}</h3>
                            <p className="notification-description">{notification.description}</p>
                            <span className="notification-time">{notification.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && activeNotification !== null && (
                <div className="notification-modal">
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleModalClose}>&times;</span>
                        <div className="modal-icon">
                            <i className={notifications[activeNotification].icon}></i>
                        </div>
                        <h2>{notifications[activeNotification].heading}</h2>
                        <p><strong>Sender:</strong> {notifications[activeNotification].sender}</p>
                        <p>{notifications[activeNotification].message}</p>
                        <span>{notifications[activeNotification].time}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationPage;