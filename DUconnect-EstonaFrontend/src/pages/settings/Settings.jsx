import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './settings.scss'; // Import your custom SCSS file for styling

const SettingsPage = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Function to handle logout
    const handleLogout = () => {
        // Display confirmation modal
        setShowConfirmation(true);
    }

    // Function to handle logout confirmation
    const confirmLogout = () => {
        // Perform logout actions here
        console.log("Logged out");

        // Redirect to login page
        // Replace this with your actual redirect logic
        window.location.href = "/login";
    }

    // Function to cancel logout
    const cancelLogout = () => {
        // Hide confirmation modal
        setShowConfirmation(false);
    }

    return (
        <div className="settings-page">
            <h1 className="settings-title">Settings</h1>
            <div className="settings-section">
                <h2 className="section-title">Account Settings</h2>
                <div className="setting-item">
                    <label>Email:</label>
                    <input type="email" value="example@example.com" disabled />
                </div>
                <div className="setting-item">
                    <label>Change Password:</label>
                    <input type="password" placeholder="Enter new password" />
                </div>
            </div>
            <div className="settings-section">
                <h2 className="section-title">Notification Settings</h2>
                <div className="setting-item">
                    <label>Enable Notifications:</label>
                    <input type="checkbox" checked />
                </div>
                <div className="setting-item">
                    <label>Notification Sound:</label>
                    <select>
                        <option value="default">Default</option>
                        <option value="chime">Chime</option>
                        <option value="bell">Bell</option>
                    </select>
                </div>
            </div>
            {/* Logout option */}
            <div className="logout-section">
                <button onClick={handleLogout}>Logout</button>
                <Link to="/login"></Link> {/* Navigate to the login page */}
            </div>

            {/* Confirmation modal */}
            {showConfirmation && (
                <div className="confirmation-modal">
                    <p>Are you sure you want to logout?</p>
                    <div className="confirmation-buttons">
                        <button onClick={confirmLogout}>Yes</button>
                        <button onClick={cancelLogout}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SettingsPage;
