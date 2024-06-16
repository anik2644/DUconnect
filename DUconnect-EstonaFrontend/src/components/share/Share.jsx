import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import { FaPhotoVideo, FaTags, FaMapMarkerAlt } from "react-icons/fa";

const Share = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [taggedFriends, setTaggedFriends] = useState("");
  const [location, setLocation] = useState("");
  const [img_path, setImagepath]= useState("")
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userName, setuserName] = useState("");
  const [profileid, setProfileId] = useState("nafisa37@gmail.com");

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
        const { profile_photo,username, ...profileDataWithoutPhoto } = data;

        // Set profile data without profile_photo
        // setProfileData(profileDataWithoutPhoto);

        // Set profile photo separately
        console.log("getting profile data:", profile_photo);
        setuserName(username)
        setProfilePhoto(profile_photo);
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  };









  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const filePath = file.webkitRelativePath || file.name;
      setImagepath(filePath);
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


    const postforbackend = {
      name: currentUser.name.toString(),
      userId: currentUser.id.toString(),
      profilePic: currentUser.profilePic.toString(),
      desc: text.toString(),
      img: img_path,
      // likes: (0).toString(),
      
    };


    fetch('http://127.0.0.1:8002/posts/', {
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
          <img src={profilePhoto} alt="Profile" className="profile-pic" />
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
