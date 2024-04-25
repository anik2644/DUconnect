import "./share.scss";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Image from "../../assets/img.png"; // Import the Image
import Map from "../../assets/map.png"; // Import the Map
import Friend from "../../assets/friend.png"; // Import the Friend image

const Share = () => {
  const { currentUser } = useContext(AuthContext);
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

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="file">
              <div className="item">
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <img src={selectedImage || Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
