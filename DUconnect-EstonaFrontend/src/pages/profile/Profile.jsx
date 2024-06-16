import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './profile.scss';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileData, setProfileData] = useState({
    userid: '2024-05-11 20:21:50.582',
    username: 'anik',
    name: 'MHD Mahmud Anik',
    email: 'anik11556@gmail.com',
    department: 'CSE',
    registrationNo: '2019317827',
    session: '19/20',
    hall: 'SH',
    password: '*******'
  });
  const [editMode, setEditMode] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");

  const [profileid, setProfileId] = useState("nafisa37@gmail.com");
  const [img_path, setImagepath] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    console.log(profileid);

    fetch(`http://localhost:8888/profile?email=${profileid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("getting data:", data);
        const { profile_photo, ...profileDataWithoutPhoto } = data;
        setProfileData(profileDataWithoutPhoto);
        console.log("getting profile data:", profile_photo);
        setProfilePhoto(profile_photo);
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      const filePath = file.webkitRelativePath || file.name;
      setImagepath(filePath);
    }

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
    console.log("Saving changes:", profileData);
    fetchProfileData();
    setUpdateMessage("Updation Successful");
  };

  const updateProfileOnServer = () => {
    const profileDatabackend = {
      userId: profileData.userId,
      username: profileData.username,
      name: profileData.name,
      email: profileData.email,
      department: profileData.department,
      registrationNo: profileData.registrationNo,
      session: profileData.session,
      hall: profileData.hall,
      password: profileData.password,
    };
    if (img_path !== "") {
      profileDatabackend.profile_photo = img_path;
    }

    console.log("profileDatabackend");
    console.log(profileDatabackend);

    fetch("http://localhost:8888/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileDatabackend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile updated successfully:", data);
        setUpdateMessage("Updation Successful");
        setTimeout(() => {
          setUpdateMessage("");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setUpdateMessage("Updation Failed");
        setTimeout(() => {
          setUpdateMessage("");
        }, 1000);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          {image ? (
            <img src={image} alt="Profile" className="profile-image" />
          ) : profilePhoto !== "" ? (
            <img src={profilePhoto} alt="Profile" className="profile-image" />
          ) : (
            <div className="camera-icon">
              <FontAwesomeIcon icon={faCamera} style={{ fontSize: "40px", color: "#555" }} />
            </div>
          )}
        </div>
        
        <div className="buttons-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-input"
          />
          <button onClick={updateProfileOnServer} className="edit-button">
            Confirm Changes
          </button>
        </div>
        
        <h1>{profileData.name}</h1>
      </div>
      <div className="profile-info">
        <table className="profile-table">
          <tbody>
            {Object.entries(profileData).map(([key, value]) => (
              <tr key={key}>
                <td className="profile-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
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
