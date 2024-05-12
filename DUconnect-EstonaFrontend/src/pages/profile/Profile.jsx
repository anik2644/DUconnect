import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./profile.scss";
const [img_path, setImagepath]= useState("")

const Profile = () => {
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const [profileid, setProfileId] = useState("anik11556@gmail.com");

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
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Profile data:', data); // Print data to console
      setProfileData(data); // Set profile data
    })
    .catch(error => console.error('Error fetching profile data:', error));
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
    // Here you can implement logic to save changes to the server
    console.log('Saving changes:', profileData);
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
      profile_photo: img_path

  };
  console.log(profileDatabackend);
    fetch('http://localhost:8888/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileDatabackend),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Profile updated successfully:', data);
      setUpdateMessage("Updation Successful");
      // Reset the update message after 1 second
  setTimeout(() => {
    setUpdateMessage("");
  }, 1000);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      setUpdateMessage("Updation Failed");
      // Reset the update message after 1 second
  setTimeout(() => {
    setUpdateMessage("");
  }, 1000);
    });
  };

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <div
          style={{
            width: '3in',
            height: '3in',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          {image ? (
            <img src={image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
              }}
            >
              <FontAwesomeIcon icon={faCamera} style={{ fontSize: '40px', color: '#555' }} />
            </div>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '10px' }} />
      </div>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', border: '2px solid black' }}>
        <tbody>
          {Object.entries(profileData || {}).map(([key, value]) => (
            <tr key={key}>
              <td style={{ border: '2px solid black', padding: '10px' }}>{key.replace('_', ' ')}</td>
              <td style={{ border: '2px solid black', padding: '10px' }}>
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
              <td style={{ border: '2px solid black', padding: '10px' }}>
                {editMode[key] ? (
                  <>
                    <FontAwesomeIcon icon={faSave} onClick={() => saveChanges()} style={{ cursor: 'pointer', marginRight: '5px' }} />
                    <FontAwesomeIcon icon={faTimes} onClick={() => toggleEditMode(key)} style={{ cursor: 'pointer' }} />
                  </>
                ) : (
                  <FontAwesomeIcon icon={faEdit} onClick={() => toggleEditMode(key)} style={{ cursor: 'pointer' }} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={updateProfileOnServer}>Edit</button>
      {updateMessage && <p>{updateMessage}</p>}
    </div>
  );
};

export default Profile;