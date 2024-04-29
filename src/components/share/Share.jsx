import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";

const Share = ({ onShare }) => {
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
    // Create a new shared post object
    const newPost = {
      id: Math.random(),
      name: currentUser.name,
      userId: currentUser.id,
      profilePic: currentUser.profilePic,
      desc: text,
      img: selectedImage,
      likes: 0,
      comments: [],
    };

    // Invoke the onShare callback to share the post
    onShare(newPost);

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
        {selectedImage && (
          <div className="selected-image-container">
            <img src={selectedImage} alt="Selected" className="selected-image" />
          </div>
        )}
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="file" className="file-label">
              <span>Add Photo/Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
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
