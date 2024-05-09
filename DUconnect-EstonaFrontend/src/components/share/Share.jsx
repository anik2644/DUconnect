import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";

const Share = (props) => {
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
  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      handleShare();
    }
  };
  const handleShare = () => {
    // Create a new shared post object
    const currentDate = new Date();
    console.log("Current date and time:", currentDate.toLocaleString());

    const postforbackend = {
      name: currentUser.name.toString(),
      userId: currentUser.id.toString(),
      profilePic: currentUser.profilePic.toString(),
      desc: text.toString(),
      img: selectedImage.toString(),
      likes: (0).toString(),
      
    };

    fetch('http://127.0.0.1:8000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postforbackend),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save post');
      }
      return response.json();
    })
    .then(data => {
      console.log(JSON.stringify(data, null, 2)); // Print response from the server
      // Message from the server
      // Optionally, you can perform any actions after successfully saving the post.
    })
    .catch(error => {
      console.error('Error saving post:', error);
    });

    // id: Date.now().toString(),

    console.log("time",Date.now().toString())

    const newPost = [{
      id: Math.random(),
      name: currentUser.name,
      userId: currentUser.id,
      profilePic: currentUser.profilePic,
      desc: text,
      img: selectedImage,
      likes: 0,
      comments: [],
    }];

    props.setPosts(props.posts.unshift(...newPost));


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
            onKeyDown={handleKeyDown} // Add onKeyDown event listener
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