// ResetPasswordPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResetPasswordPage.scss';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }
        // Add logic here to save the new password
        console.log('New password saved:', password);
        // Redirect user to login page
        window.location.href = '/login';
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Reset Password</h2>
                <p>Please enter your new password and confirm it.</p>
                <form onSubmit={handleSubmit}>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" required />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required />
                    <button type="submit">Save</button>
                </form>
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
