import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './settings.scss';

const SettingsPage = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = () => {
        setShowConfirmation(true);
    }

    const confirmLogout = () => {
        console.log("Logged out");
        window.location.href = "/login";
    }

    const cancelLogout = () => {
        setShowConfirmation(false);
    }

    return (
        <div className="settings-page">
            <h1 className="settings-title">Logout Alert !!!</h1>
            <p>If you want to logout, please click the button below.</p>
            <div className="logout-section">
                <button onClick={handleLogout}>Logout</button>
                <Link to="/login"></Link>
            </div>

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
