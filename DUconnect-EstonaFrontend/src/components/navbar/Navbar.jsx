import "./navbar.scss";
import { useState, useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
//import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const {toggle ,darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userName, setuserName] = useState("");
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



  const handleSearchClick = () => {
    // Handle search functionality
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>DUCONNECT</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}

        <div className="search" onClick={handleSearchClick}>
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <Link to="/profile">
          <PersonOutlinedIcon />
        </Link>
        <a  href ="https://mail.google.com/">
          <EmailOutlinedIcon />
        </a>
        <Link to="/notification">
          <NotificationsOutlinedIcon />
        </Link>
        <div className="user">
          <img src={profilePhoto} alt="" />
          <span>{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
