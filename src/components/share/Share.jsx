import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import Image from "../../assets/img.png"; // Import the Image
import Map from "../../assets/map.png"; // Import the Map
import Friend from "../../assets/friend.png"; // Import the Friend image

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    // Your logic to share the post goes here
    const postData = {
      text,
      image: selectedImage, // Send the selected image as part of the post data
    };
    console.log("Post data:", postData);

    // Clear input fields after sharing
    setText("");
    setSelectedImage(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="Profile" className="profile-pic" />
          <input
            type="text"
            placeholder={`What's on your mind, ${currentUser.name}?`}
            className="post-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="file" className="file-label">
              <img src={Image} alt="Add Image" className="icon" />
              <span>Add Photo/Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
            <div className="option">
              <img src={Map} alt="Add Location" className="icon" />
              <span>Add Location</span>
            </div>
            <div className="option">
              <img src={Friend} alt="Tag Friends" className="icon" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button className="share-button" onClick={handleShare}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
