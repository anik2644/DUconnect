import { Link } from 'react-router-dom';
 import "./leftBar.scss";
import Home from "../../assets/1.png";
import Notifications from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";

import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
          {/* Link to Home page */}
          <Link to="/" className="item">
            <img src={Home} alt="" />
            <span>Home</span>
          </Link>
          {/* Link to Notifications page */}
          <Link to="/notification" className="item">
            <img src={Notifications} alt="" />
            <span>Notifications</span>
          </Link>
          {/* Link to Settings page */}
          <Link to="/settings" className="item">
            <img src={Market} alt="" />
            <span>Settings</span>
          </Link>
          {/* Link to My Profile page */}
          <Link to="/profile" className="item">
            <img src={Watch} alt="" />
            <span>My Profile</span>
          </Link>
          {/* Link to Terms and Conditions page */}
          <Link to="/terms" className="item">
            <img src={Memories} alt="" />
            <span>Terms and Conditions</span>
          </Link>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          {/* Link to Events page */}
          <Link to="/event" className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </Link>
          {/* Link to Blood Donation page */}
          <Link to="/blood-donation" className="item">
            <img src={Gaming} alt="" />
            <span>Blood Donations</span>
          </Link>
          {/* Link to Articles page */}
          <Link to="/article" className="item">
            <img src={Gallery} alt="" />
            <span>Articles</span>
          </Link>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          {/* Link to Fundraiser page */}
          <Link to="/fundraiser" className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </Link>
          {/* Link to Tutorials page */}
          <Link to="/tutorials" className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </Link>
          {/* Link to Courses page */}
          <Link to="/courses" className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
