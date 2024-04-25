import React from 'react';
import './notification.scss'; // Import your custom SCSS file for styling

const NotificationPage = () => {
    return (
        <div className="notification-page">
            <h1 className="notification-title">Notifications</h1>
            <div className="notification-list">
                {/* Example notification items */}
                <div className="notification-item">
                    <div className="notification-icon">
                        {/* You can use an icon here */}
                        <i className="fas fa-bell"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">New Message</h3>
                        <p className="notification-description">You have received a new message from John Doe.</p>
                        <span className="notification-time">2 hours ago</span>
                    </div>
                </div>
                <div className="notification-item">
                    <div className="notification-icon">
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Urgent Alert</h3>
                        <p className="notification-description">Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.</p>
                        <span className="notification-time">Yesterday</span>
                    </div>
                </div>
                <div className="notification-item">
                    <div className="notification-icon">
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Urgent Alert</h3>
                        <p className="notification-description">Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.</p>
                        <span className="notification-time">Yesterday</span>
                    </div>
                </div>
                <div className="notification-item">
                    <div className="notification-icon">
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Urgent Alert</h3>
                        <p className="notification-description">Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.</p>
                        <span className="notification-time">Yesterday</span>
                    </div>
                </div>
                <div className="notification-item">
                    <div className="notification-icon">
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Urgent Alert</h3>
                        <p className="notification-description">Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.</p>
                        <span className="notification-time">Yesterday</span>
                    </div>
                </div>
                <div className="notification-item">
                    <div className="notification-icon">
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                    <div className="notification-content">
                        <h3 className="notification-heading">Urgent Alert</h3>
                        <p className="notification-description">Emergency drill scheduled for tomorrow at 10 AM. Please be prepared.</p>
                        <span className="notification-time">Yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;
