import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./profile.scss";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const [profileid, setProfileId] = useState("anik11556@gmail.com");
  const [img_path, setImagepath] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    console.log(profileid);

    fetch(`http://localhost:8888/profile?email=${profileid}`, {
      method: "GET", // Change method to GET
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(profileid)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("getting data:", data); // Print data to console
        // Delete the 'profile_photo' field from the data
        const { profile_photo, ...profileDataWithoutPhoto } = data;

        // Set profile data without profile_photo
        setProfileData(profileDataWithoutPhoto);

        // Set profile photo separately
        console.log("getting profile data:", profile_photo);
        setProfilePhoto(profile_photo);
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  };
  // const fetchProfileData = () => {
  //   fetch('http://localhost:8888/profile',
  //      {
  //     method: "GET", // Change method to GET
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  // })
  //     .then(response => response.json())
  //     .then(data => setProfileData(data))
  //     .catch(error => console.error('Error fetching profile data:', error));
  // };

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
    setEditMode((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleValueChange = (key, newValue) => {
    setProfileData((prevData) => ({
      ...prevData,
      [key]: newValue,
    }));
  };

  const saveChanges = () => {
    // Here you can implement logic to save changes to the server
    console.log("Saving changes:", profileData);
    // After saving changes, fetch profile data again
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
      // profile_photo: img_path,
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
        // Reset the update message after 1 second
        setTimeout(() => {
          setUpdateMessage("");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setUpdateMessage("Updation Failed");
        // Reset the update message after 1 second
        setTimeout(() => {
          setUpdateMessage("");
        }, 1000);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        {image ? (
          <img src={image} alt="Profile" className="profile-image" />
        ) : profilePhoto !== "" ? (
          <img src={profilePhoto} alt="Profile" className="profile-image" />
        ) : (
          <div className="camera-icon">
            <FontAwesomeIcon
              icon={faCamera}
              style={{ fontSize: "40px", color: "#555" }}
            />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="upload-input"
      />
      <table className="profile-table">
        <tbody>
          {Object.entries(profileData || {}).map(([key, value]) => (
            <tr key={key}>
              <td>{key.replace("_", " ")}</td>
              <td>
                {key === "password" ? (
                  editMode[key] ? (
                    <input
                      type="password"
                      value={profileData[key]}
                      onChange={(e) => handleValueChange(key, e.target.value)}
                    />
                  ) : (
                    "••••••••"
                  )
                ) : editMode[key] ? (
                  <input
                    type="text"
                    value={profileData[key]}
                    onChange={(e) => handleValueChange(key, e.target.value)}
                  />
                ) : (
                  profileData[key]
                )}
              </td>
              <td>
                {editMode[key] ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSave}
                      onClick={() => saveChanges()}
                      className="edit-icons"
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => toggleEditMode(key)}
                      className="edit-icons"
                    />
                  </>
                ) : (
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => toggleEditMode(key)}
                    className="edit-icons"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="edit-button">
        <button onClick={updateProfileOnServer}> Edit Profile </button>
      </div>
      {updateMessage && <p className="update-message">{updateMessage}</p>}
    </div>
  );
};

export default Profile;
