// ForgetPasswordPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgetPasswordPage.css';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic here to send reset password link to the email
        console.log('Reset password link sent to:', email, ' with registration number:', registrationNumber);
        // Open new window for entering new password
        window.open('/resetpassword', '_blank');
    };

    return (
        <div className="forget-password-container">
            <div className="forget-password-box">
                <h2>Forget Password</h2>
                <p>Please enter your email address and registration number associated with your account. We will send you a link to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required />
                    <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} placeholder="Registration number" required />
                    <button type="submit">Submit</button>
                </form>
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;
