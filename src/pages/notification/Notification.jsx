// NotificationPage.jsx

import React from 'react';
import './notification.scss'; // Import your custom SCSS file for styling

const NotificationPage = () => {
    return (
        <div className="notification-page">
            <h1 className="notification-title">Notifications</h1>
            <div className="notification-list">
                {/* Example notification items */}
                <div className="notification-item new-message">
                    <div className="notification-icon">
                        {/* You can use an icon here */}
                        <i className="fas fa-envelope"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">New Message</h3>
                        <p className="notification-description">You have received a new message from John Doe.</p>
                        <span className="notification-time">2 hours ago</span>
                    </div>
                </div>
                <div className="notification-item urgent-alert">
                    <div className="notification-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Urgent Alert</h3>
                        <p className="notification-description">Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.</p>
                        <span className="notification-time">Yesterday</span>
                    </div>
                </div>
                <div className="notification-item new-follower">
                    <div className="notification-icon">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">New Follower</h3>
                        <p className="notification-description">You have a new follower: Jane Smith.</p>
                        <span className="notification-time">3 hours ago</span>
                    </div>
                </div>
                <div className="notification-item event-reminder">
                    <div className="notification-icon">
                        <i className="far fa-calendar-alt"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Event Reminder</h3>
                        <p className="notification-description">Don't forget: Today is your anniversary with Robert Johnson.</p>
                        <span className="notification-time">Today</span>
                    </div>
                </div>
                <div className="notification-item new-comment">
                    <div className="notification-icon">
                        <i className="fas fa-comment"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">New Comment</h3>
                        <p className="notification-description">John Doe commented on your post.</p>
                        <span className="notification-time">4 hours ago</span>
                    </div>
                </div>
                <div className="notification-item promotion">
                    <div className="notification-icon">
                        <i className="fas fa-tags"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Promotion</h3>
                        <p className="notification-description">Limited-time offer: Get 20% off your next purchase!</p>
                        <span className="notification-time">Today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;
