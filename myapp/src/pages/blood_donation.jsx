import React, { useState } from "react";

const BloodDonation = () => {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [area, setArea] = useState("");
  const [warning, setWarning] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !bloodGroup || !department || !session || !area) {
      setWarning("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/store_blood_info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          bloodGroup,
          department,
          session,
          area
        }),
      });
      if (response.ok) {
        setMessage("Blood Donation Information Saved");
      } else {
        setMessage("Error");
      }
    } catch (error) {
      setMessage("Error");
    }
    setTimeout(() => setMessage(""), 1000); // Clear message after 1 second
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-purple-800">
      <div className="bg-opacity-50 bg-white p-8 rounded-lg relative">
        <div className="flex justify-between">
          <div className="w-1/3">
            <img
              src="blood-drop-image-url"
              alt="Blood Drop"
              className="w-24 h-24"
            />
          </div>
          <div className="w-2/3 pl-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
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
              </div>
              <div className="mb-4">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="ACCE">ACCE</option>
                  <option value="SE">SE</option>
                  <option value="NE">NE</option>
                  <option value="EME">EME</option>
                </select>
              </div>
              <div className="mb-4">
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                >
                  <option value="">Select Session</option>
                  <option value="2019-20">2019-20</option>
                  <option value="2020-21">2020-21</option>
                  <option value="2021-22">2021-22</option>
                  <option value="2022-23">2022-23</option>
                </select>
              </div>
              <div className="mb-4">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 w-full"
                >
                  <option value="">Select Area</option>
                  <option value="TSC">TSC</option>
                  <option value="Fular Road">Fular Road</option>
                  <option value="Nilkhet">Nilkhet</option>
                  <option value="Polashi">Polashi</option>
                  <option value="Bokshibazar">Bokshibazar</option>
                </select>
              </div>
              {warning && <p className="text-red-500">{warning}</p>}
              {message && <p className="text-green-500">{message}</p>}
              <button
                type="submit"
                className="bg-purple-600 text-white rounded-md p-3 hover:bg-purple-800 absolute bottom-0 right-0"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonation;

