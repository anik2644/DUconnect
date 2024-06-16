import React from 'react';
import Slider from 'react-slick';
import './UniversityDhakaOverview.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UniversityDhakaOverview = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="university-dhaka">
      <nav className="navbar">
        <div className="logo">University of Dhaka</div>
        <ul className="nav-links">
          <li><a href="/login" className="button">Login</a></li>
          <li><a href="/register" className="button">Signup</a></li>
          <li><a href="#contact" className="button">Contact</a></li>
        </ul>
      </nav>

      <div className="content">
        <div className="banner">
          <h1>Campus Life</h1>
          <h2>A Home Under the History</h2>
          <p>University of Dhaka is a community of scholars committed to holistic education.</p>
        </div>
        <div className="description">
          <div className="history">
            <h3>History of University of Dhaka</h3>
            <p>
              The University of Dhaka, established in 1921, is the oldest university in Bangladesh.
              It has a rich heritage and has played a significant role in the nation's history,
              contributing to the intellectual, cultural, and political life of the country.
            </p>
            <p>
              Over the years, the university has evolved into a comprehensive institution of higher education,
              known for its academic excellence and research contributions in various fields.
            </p>
          </div>
          <div className="photos">
            <img src="https://i.ibb.co/Ldd5cGL/cz.jpg" alt="University of Dhaka Main Building" />
            <img src="https://i.ibb.co/WBTWVQT/16871043848757.jpg" alt="University of Dhaka Campus View" />
            <img src="https://i.ibb.co/GJHqRQM/tsc.jpg" alt="University of Dhaka TSC" />
            <img src="https://i.ibb.co/rxhHZhQ/images.jpg" alt="University of Dhaka Another View" />
          </div>
        </div>
        <div className="additional-info">
          <Slider {...sliderSettings}>
            <div className="info-section">
              <h3>Current Students</h3>
              <p>Learn about the resources and opportunities available to current students at the University of Dhaka.</p>
            </div>
            <div className="info-section">
              <h3>Alumni</h3>
              <p>Discover how our alumni are making an impact in various fields around the world.</p>
            </div>
          </Slider>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 University of Dhaka. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UniversityDhakaOverview;
