import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext"; // Assuming AuthContext for user data
import "./EditProfilePage.scss";

const EditProfile = () => {
  const { currentUser, updateUser } = useContext(AuthContext); // Access user data and update function
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email, // Read-only
    title: currentUser.title || "", // Optional title
    phone: currentUser.phone || "", // Optional phone number
    website: currentUser.website || "", // Optional website
    socialMedia: currentUser.socialMedia || {}, // Optional social media links
    aboutMe: currentUser.aboutMe || "", // Optional about me description
    skills: currentUser.skills || [], // Optional skills list
    experience: currentUser.experience || [], // Optional experience list
    education: currentUser.education || [], // Optional education list
    certifications: currentUser.certifications || [], // Optional certifications list
    portfolio: currentUser.portfolio || "", // Optional portfolio link
  });
  const [profilePic, setProfilePic] = useState(null); // Store uploaded image file

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      socialMedia: { ...prevData.socialMedia, [platform]: value },
    }));
  };

  const handleSkillAdd = (skill) => {
    setProfileData((prevData) => ({ ...prevData, skills: [...prevData.skills, skill] }));
  };

  const handleSkillRemove = (index) => {
    setProfileData((prevData) => {
      const updatedSkills = [...prevData.skills];
      updatedSkills.splice(index, 1);
      return { ...prevData, skills: updatedSkills };
    });
  };

  const handleExperienceAdd = (experience) => {
    setProfileData((prevData) => ({ ...prevData, experience: [...prevData.experience, experience] }));
  };

  const handleExperienceRemove = (index) => {
    setProfileData((prevData) => {
      const updatedExperience = [...prevData.experience];
      updatedExperience.splice(index, 1);
      return { ...prevData, education: updatedExperience }; // Typo corrected
    });
  };

  const handleEducationAdd = (education) => {
    setProfileData((prevData) => ({ ...prevData, education: [...prevData.education, education] }));
  };

  const handleEducationRemove = (index) => {
    setProfileData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation.splice(index, 1);
      return { ...prevData, education: updatedEducation };
    });
  };

  const handleCertificationAdd = (certification) => {
    setProfileData((prevData) => ({ ...prevData, certifications: [...prevData.certifications, certification] }));
  };

  const handleCertificationRemove = (index) => {
    setProfileData((prevData) => {
      const updatedCertifications = [...prevData.certifications];
      updatedCertifications.splice(index, 1);
      return { ...prevData, certifications: updatedCertifications };
    });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePic(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Implement image upload logic (if applicable to your setup)
      const formData = new FormData(); // Assuming server-side image upload

      // Include other profile data in the form data
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      // Add uploaded image file (if present)
            if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      await updateUser(formData); // Call update function from AuthContext, passing formData
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile">
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <div className="profile-picture">
          <img src={currentUser.profilePic || "https://placehold.co/"} alt="Profile Picture" /> {/* Placeholder if no profile pic */}
          <label htmlFor="profile-pic-upload">
            Change Picture
            <input type="file" id="profile-pic-upload" accept="image/*" onChange={handleProfilePicChange} />
          </label>
        </div>

        {/* Basic Information Section */}
        <section className="basic-info">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={profileData.name} onChange={handleChange} required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={profileData.email} readOnly />
          <label htmlFor="title">Title (Optional):</label>
          <input type="text" id="title" name="title" value={profileData.title} onChange={handleChange} />
        </section>

        {/* Contact Information Section (Optional) */}
        <section className="contact-info">
          <label htmlFor="phone">Phone Number (Optional):</label>
          <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
          <label htmlFor="website">Website (Optional):</label>
          <input type="url" id="website" name="website" value={profileData.website} onChange={handleChange} />
        </section>

        {/* Social Media Links Section (Optional) */}
        <section className="social-media">
          <h3>Social Media:</h3>
          {/* Add code to display and manage social media links (e.g., using a component or loop) */}
          {Object.keys(profileData.socialMedia).map((platform) => (
            <div key={platform}>
              <label htmlFor={`social-${platform}`}>{platform.charAt(0).toUpperCase() + platform.slice(1)}:</label>
              <input
                type="text"
                id={`social-${platform}`}
                name={`socialMedia[${platform}]`}
                value={profileData.socialMedia[platform]}
                onChange={(event) => handleSocialMediaChange(platform, event.target.value)}
              />
            </div>
          ))}
        </section>

        {/* About Me Section */}
        <section className="about-me">
          <label htmlFor="aboutMe">About Me:</label>
          <textarea id="aboutMe" name="aboutMe" value={profileData.aboutMe} onChange={handleChange} />
        </section>

        {/* Skill/Experience/Education/Certification Sections (Optional) */}
        {/* Add code to display and manage these sections using custom components or loops */}
        {/** You can implement these sections similarly to the social media links section */}

        {/* Portfolio Link Section (Optional) */}
        <section className="portfolio">
          <label htmlFor="portfolio">Portfolio Link (Optional):</label>
          <input type="url" id="portfolio" name="portfolio" value={profileData.portfolio} onChange={handleChange} />
        </section>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
