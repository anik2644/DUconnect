import { useState } from "react";
import "./BloodDonation.scss"; // Styles for BloodDonation page
import { Link } from 'react-router-dom';

const BloodDonation = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [area, setArea] = useState("");
  const [warning, setWarning] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !dateOfBirth ||
      !address ||
      !registrationNumber ||
      !bloodGroup ||
      !department ||
      !session ||
      !area
    ) {
      setWarning("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8004/store_blood_info/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          dateOfBirth,
          address,
          registrationNumber,
          bloodGroup,
          department,
          session,
          area,
        }),
      });
      if (response.ok) {
        setMessage("Blood Donation Information Saved");
        // Clear input fields after successful submission
        setName("");
        setDateOfBirth("");
        setAddress("");
        setRegistrationNumber("");
        setBloodGroup("");
        setDepartment("");
        setSession("");
        setArea("");
      } else {
        setMessage("Error");
      }
    } catch (error) {
      setMessage("Error");
    }
    setTimeout(() => setMessage(""), 1000); // Clea

    console.log("Form submitted:", {
      name,
      dateOfBirth,
      address,
      registrationNumber,
      bloodGroup,
      department,
      session,
      area,
    });
  };

  return (
    <div className="blood-donation-page">

      {/* Logo on the left */}

      {/* Form on the right */}
      <div className="donation-form">

      <Link to="/blood-list" className="Create-Event">
        <button className="blood-list-button">Blood Requsition List</button>
      </Link>
        <h2>Medical Blood Donation Consent Form</h2>
        <img
          src="https://i.ibb.co/0Kcyhph/blood-donation.jpg"
          alt="Blood Donation Logo"
          className="logo"
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <div className="name-inputs">
                <input
                  type="text"
                  placeholder="First"
                  value={name.split(" ")[0]}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last"
                  value={name.split(" ")[1] || ""}
                  onChange={(e) =>
                    setName(name.split(" ")[0] + " " + e.target.value)
                  }
                  required
                />
              </div>
            </label>
          </div>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            Registration Number:
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Blood Group:
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            >
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
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
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
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              required
            >
              <option value="">Select Session</option>
              <option value="2019-20">2019-20</option>
              <option value="2020-21">2020-21</option>
              <option value="2021-22">2021-22</option>
              <option value="2022-23">2022-23</option>
            </select>
          </label>
          <label>
            Area:
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            >
              <option value="">Select Area</option>
              <option value="TSC">TSC</option>
              <option value="Fular Road">Fular Road</option>
              <option value="Nilkhet">Nilkhet</option>
              <option value="Polashi">Polashi</option>
              <option value="Bokshibazar">Bokshibazar</option>
            </select>
          </label>
          {warning && <p className="warning-text">{warning}</p>}
          {message && <p className="message-text">{message}</p>}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BloodDonation;
