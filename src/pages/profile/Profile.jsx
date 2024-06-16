import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './profile.scss';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Jeremy Rose',
    occupation: 'Product Designer',
    rating: '8.6',
    phone: '+1 123 456 7890',
    address: '525 E 68th Street, New York, NY 10651-78 156-187-60',
    email: 'hello@jeremyrose.com',
    site: 'www.jeremyrose.com',
    birthday: 'June 5, 1992',
    gender: 'Male',
    work: 'Spotify New York, Metropolitan Museum',
    skills: 'Branding, UI/UX, Web Design, Packaging, Print & Editorial'
  });
  const [editMode, setEditMode] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    // Simulate fetching profile data
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = (key) => {
    setEditMode(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleValueChange = (key, newValue) => {
    setProfileData(prevData => ({
      ...prevData,
      [key]: newValue,
    }));
  };

  const saveChanges = () => {
    console.log('Saving changes:', profileData);
    setUpdateMessage("Updation Successful");
    setTimeout(() => {
      setUpdateMessage("");
    }, 1000);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          {image ? (
            <img src={image} alt="Profile" />
          ) : (
            <div className="image-placeholder">
              <FontAwesomeIcon icon={faCamera} />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="upload-input" />
        </div>
        <h1>{profileData.name}</h1>
        <h2>{profileData.occupation}</h2>
        <div className="profile-rating">
          <span className="rating">{profileData.rating}</span>
          <span className="stars">★ ★ ★ ★ ★</span>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-contact">

          <button className="contact-button">Contacts</button>
        </div>
        <table className="profile-table">
          <tbody>
            {Object.entries(profileData).map(([key, value]) => (
              <tr key={key}>
                <td className="profile-key">{key.replace('_', ' ')}</td>
                <td className="profile-value">
                  {editMode[key] ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleValueChange(key, e.target.value)}
                    />
                  ) : (
                    value
                  )}
                </td>
                <td className="profile-actions">
                  {editMode[key] ? (
                    <>
                      <FontAwesomeIcon icon={faSave} onClick={saveChanges} />
                      <FontAwesomeIcon icon={faTimes} onClick={() => toggleEditMode(key)} />
                    </>
                  ) : (
                    <FontAwesomeIcon icon={faEdit} onClick={() => toggleEditMode(key)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {updateMessage && <p className="update-message">{updateMessage}</p>}
    </div>
  );
};

export default Profile;
