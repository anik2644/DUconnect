import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import { FaPhotoVideo, FaTags, FaMapMarkerAlt } from "react-icons/fa";

const Share = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [taggedFriends, setTaggedFriends] = useState("");
  const [location, setLocation] = useState("");

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

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      handleShare();
    }
  };

  const handleShare = () => {
    const newPost = [{
      id: Math.random(),
      name: currentUser.name,
      userId: currentUser.id,
      profilePic: currentUser.profilePic,
      desc: text,
      img: selectedImage,
      taggedFriends: taggedFriends,
      location: location,
      likes: 0,
      comments: [],
    }];

    props.setPosts(props.posts.unshift(...newPost));

    // Clear input fields after sharing
    setText("");
    setSelectedImage(null);
    setTaggedFriends("");
    setLocation("");
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
            onKeyDown={handleKeyDown}
          />
        </div>
        {selectedImage && (
          <div className="selected-image-container">
            <img src={selectedImage} alt="Selected" className="selected-image" />
          </div>
        )}
        <hr />
        <div className="bottom">
          <div className="options">
            <label htmlFor="file" className="option">
              <FaPhotoVideo className="icon" />
              <span>Add Photo/Video</span>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
            <div className="option">
              <FaTags className="icon" />
              <input
                type="text"
                placeholder="Tag Friends"
                value={taggedFriends}
                onChange={(e) => setTaggedFriends(e.target.value)}
              />
            </div>
            <div className="option">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                placeholder="Add Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <button className="share-button" onClick={handleShare}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
