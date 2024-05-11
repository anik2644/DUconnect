import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8888/profile')
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

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
              <td style={{ border: '2px solid black', padding: '10px' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
