import { useState } from 'react';
import './BloodDonation.scss'; // Styles for BloodDonation page

const BloodDonation = () => {
    // State variables for form fields
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [department, setDepartment] = useState('');
    const [session, setSession] = useState('');
    const [area, setArea] = useState('');
    const [warning, setWarning] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here (e.g., submit to backend)
        console.log('Form submitted:', { name, dateOfBirth, address, registrationNumber, bloodGroup, department, session, area });
    };

    return (
        <div className="blood-donation-page">
            {/* Logo on the left */}
            <div className="logo">
                <img src="https://i.ibb.co/0Kcyhph/blood-donation.jpg" alt="Blood Donation Logo" />
            </div>
            {/* Form on the right */}
            <div className="donation-form">
                <h2>Blood Donation Form</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label>
                        Date of Birth:
                        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                    </label>
                    <label>
                        Address:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </label>
                    <label>
                        Registration Number:
                        <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required />
                    </label>
                    <label>
                        Blood Group:
                        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </label>
                    <label>
                        Department:
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option value="">Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="EEE">EEE</option>
                            <option value="ACCE">ACCE</option>
                            <option value="SE">SE</option>
                            <option value="NE">NE</option>
                            <option value="EME">EME</option>
                        </select>
                    </label>
                    <label>
                        Session:
                        <select value={session} onChange={(e) => setSession(e.target.value)} required>
                            <option value="">Select Session</option>
                            <option value="2019-20">2019-20</option>
                            <option value="2020-21">2020-21</option>
                            <option value="2021-22">2021-22</option>
                            <option value="2022-23">2022-23</option>
                        </select>
                    </label>
                    <label>
                        Area:
                        <select value={area} onChange={(e) => setArea(e.target.value)} required>
                            <option value="">Select Area</option>
                            <option value="TSC">TSC</option>
                            <option value="Fular Road">Fular Road</option>
                            <option value="Nilkhet">Nilkhet</option>
                            <option value="Polashi">Polashi</option>
                            <option value="Bokshibazar">Bokshibazar</option>
                        </select>
                    </label>
                    {warning && <p className="text-red-500">{warning}</p>}
                    {message && <p className="text-green-500">{message}</p>}
                    <button type="submit" className="bg-purple-600 text-white rounded-md p-3 hover:bg-purple-800">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BloodDonation;
