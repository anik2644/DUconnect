import React, { useState, useEffect } from "react";
import './BloodList.scss'; // Import your CSS file for styling

const BloodList = () => {
  const [bloodList, setBloodList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBloodInformation();
  }, []); // Fetch data when component mounts

  const fetchBloodInformation = async () => {
    try {
      const response = await fetch('http://localhost:8080/get_blood_info'); // Assuming you have an endpoint to fetch blood information
      if (response.ok) {
        const data = await response.json();
        setBloodList(data);
      } else {
        console.error('Failed to fetch blood information');
      }
    } catch (error) {
      console.error('Error fetching blood information:', error);
    }
  };

  const filteredBloodList = bloodList.filter((item) =>
    item.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blood-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Blood Group"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h2 className="heading">Blood List</h2>
      <table className="blood-table">
        <thead>
          <tr>
            <th>Requisition ID</th>
            <th>Requester ID</th>
            <th>Blood Group</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredBloodList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.registrationNumber}</td>
              <td>{item.bloodGroup}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.address}</td>
              <td>{item.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodList;
