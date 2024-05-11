/*import { useState } from "react";
import "./profile.scss";
import { CameraAlt } from "@mui/icons-material"; // Import camera icon from MUI
import Posts from "../../components/posts/Posts";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(file);
  };

  return (
    <div className="profile">
      <div className="images">
        <label htmlFor="profilePictureInput">
          <div className="imageContainer">
            <img
              src={profilePicture ? URL.createObjectURL(profilePicture) : ""}
              alt=""
              className={profilePicture ? "cover" : "placeholder"}
            />
            {!profilePicture && (
              <div className="placeholderContent">
                <CameraAlt fontSize="large" />
              </div>
            )}
          </div>
        </label>
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="profileContainer">
      </div>
    </div>
  );
};

export default Profile;
*/
//////////
/*
import { useState, useEffect } from "react";
import "./profile.scss";
import { CameraAlt, Edit } from "@mui/icons-material"; // Import camera and edit icons from MUI
import { Link } from "react-router-dom";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    username: "",
    name: "",
    email: "",
    department: "",
    registrationNo: "",
    session: "",
    hall: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user information from registration_information.txt
    const fetchData = async () => {
      try {
        const response = await fetch("URL_TO_FETCH_USER_INFO");
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    // Update user information in registration_information.txt
    // Show confirmation popup
    setIsEditing(false);
  };

  return (
    <div className="profile" style={{ backgroundColor: "#ffcccc" }}>
      <div className="images">
        <label htmlFor="profilePictureInput">
          <div className="imageContainer">
            <img
              src={profilePicture ? URL.createObjectURL(profilePicture) : ""}
              alt=""
              className={profilePicture ? "cover" : "placeholder"}
            />
            {!profilePicture && (
              <div className="placeholderContent">
                <CameraAlt fontSize="large" />
              </div>
            )}
          </div>
        </label>
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="profileContainer">
        {Object.keys(userInfo).map((key) => (
          <div key={key} className="infoField">
            <input
              type="text"
              name={key}
              value={userInfo[key]}
              onChange={handleInputChange}
              readOnly={!isEditing}
              style={{ backgroundColor: "white" }}
            />
            {isEditing && (
              <Edit fontSize="small" onClick={handleEditConfirm} />
            )}
          </div>
        ))}
        <div className="buttonContainer">
          {!isEditing ? (
            <button onClick={handleEditClick}>Edit</button>
          ) : (
            <button onClick={handleEditConfirm}>Confirm</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
*/

import { useState, useEffect } from "react";
import "./profile.scss";
import { CameraAlt, Edit } from "@mui/icons-material"; // Import camera and edit icons from MUI
import { Link } from "react-router-dom";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    username: "",
    name: "",
    email: "",
    department: "",
    registrationNo: "",
    session: "",
    hall: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user information from registration_information.txt
    const fetchData = async () => {
      try {
        const response = await fetch("URL_TO_FETCH_USER_INFO");
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = () => {
    // Update user information in registration_information.txt
    // Show confirmation popup
    setIsEditing(false);
  };

  return (
    <div className="profile" style={{ backgroundColor: "#ffcccc", height: "100vh", padding: "20px" }}>
      <div className="images" style={{ marginBottom: "20px" }}>
        <label htmlFor="profilePictureInput">
          <div className="imageContainer">
            <img
              src={profilePicture ? URL.createObjectURL(profilePicture) : ""}
              alt=""
              className={profilePicture ? "cover" : "placeholder"}
            />
            {!profilePicture && (
              <div className="placeholderContent">
                <CameraAlt fontSize="large" />
              </div>
            )}
          </div>
        </label>
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="profileContainer">
        {Object.keys(userInfo).map((key, index) => (
          <div key={key} className="infoField" style={{ marginBottom: "10px" }}>
            <input
              type="text"
              name={key}
              value={userInfo[key]}
              onChange={handleInputChange}
              readOnly={!isEditing}
              style={{ backgroundColor: "white", marginRight: "10px" }}
            />
            {isEditing && index === 0 && (
              <Edit fontSize="small" onClick={handleEditConfirm} />
            )}
          </div>
        ))}
        <div className="buttonContainer">
          {!isEditing ? (
            <button onClick={handleEditClick}>Edit</button>
          ) : (
            <button onClick={handleEditConfirm}>Confirm</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;


