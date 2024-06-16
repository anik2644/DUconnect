import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faCog, faUser, faScroll, faCalendarAlt, faTint, faNewspaper, faDollarSign, faGraduationCap, faVideo } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { DarkModeContext } from '../../context/darkModeContext';

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const { toggle, darkMode } = useContext(DarkModeContext);

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
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
          {/* Link to Notifications page */}
          <Link to="/notification" className="item">
            <FontAwesomeIcon icon={faBell} />
            <span>Notifications</span>
          </Link>
          {/* Link to Settings page */}
          <Link to="/settings" className="item">
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </Link>
          {/* Link to My Profile page */}
          <Link to="/profile" className="item">
            <FontAwesomeIcon icon={faUser} />
            <span>My Profile</span>
          </Link>
          {/* Link to Terms and Conditions page */}
          <Link to="/terms" className="item">
            <FontAwesomeIcon icon={faScroll} />
            <span>Terms and Conditions</span>
          </Link>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          {/* Link to Events page */}
          <Link to="/event" className="item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Events</span>
          </Link>
          {/* Link to Blood Donation page */}
          <Link to="/blood-donation" className="item">
            <FontAwesomeIcon icon={faTint} />
            <span>Blood Donations</span>
          </Link>
          {/* Link to Articles page */}
          <Link to="/article" className="item">
            <FontAwesomeIcon icon={faNewspaper} />
            <span>Articles</span>
          </Link>
        </div>
        <hr />
        <div className="menu">

          {/* Link to Fundraiser page */}
          <Link to="/fundraiser" className="item">


          </Link>
          {/* Link to Tutorials page */}
          <Link to="/tutorials" className="item">


          </Link>
          {/* Link to Courses page */}
          <Link to="/courses" className="item">


          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
