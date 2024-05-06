import React, { useState, useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [stories, setStories] = useState([
    {
      id: 1,
      name: "Anik",
      img: "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "Nafisa",
      img: "https://i.ibb.co/4FKGyqb/pikaso-texttoimage-Generate-an-image-depicting-Robo-Buddies-interactiv-4.jpg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "Meherin",
      img: "https://i.ibb.co/3BFM7r6/akamai-ddos-1088x725-1.webp?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "Preety",
      img: "https://i.ibb.co/bB3rPXQ/betterthanfr.jpg ?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ]);
  const [newStoryImg, setNewStoryImg] = useState(""); // State for the new story image URL
  const [showAddOptions, setShowAddOptions] = useState(false); // State to control the visibility of add options
  const [expanded, setExpanded] = useState(false); // State to track if stories are expanded
  const [selectedStory, setSelectedStory] = useState(null); // State to track the selected story for full view

  // Function to handle selecting an image from the device
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewStoryImg(reader.result);
      setShowAddOptions(true);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to handle canceling the addition of a new story
  const cancelAddStory = () => {
    setNewStoryImg("");
    setShowAddOptions(false);
  };

  // Function to handle adding a new story
  const addStory = () => {
    if (newStoryImg.trim() !== "") {
      const newStory = {
        id: stories.length + 1,
        img: newStoryImg,
        name: "Anik", // You might want to add functionality to allow the user to input their name
      };
      setStories([...stories, newStory]);
      setNewStoryImg("");
      setShowAddOptions(false);
    }
  };

  // Function to toggle expansion of stories
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  // Function to handle clicking on a story
  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  // Function to close the full view modal
  const closeFullView = () => {
    setSelectedStory(null);
  };

  // Function to delete a story
  const deleteStory = (storyId) => {
    const updatedStories = stories.filter((story) => story.id !== storyId);
    setStories(updatedStories);
    setSelectedStory(null); // Close the full view modal after deleting
  };

  return (
    <div className={`stories ${expanded ? 'expanded' : ''}`}>
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <label htmlFor="file-upload" className="add-button">+</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {showAddOptions && (
          <div className="add-options">
            <button onClick={addStory}>Add to Story</button>
            <button onClick={cancelAddStory}>Cancel</button>
          </div>
        )}
      </div>
      {stories.slice(0, expanded ? stories.length : 3).map((story) => (
        <div className="story" key={story.id} onClick={() => handleStoryClick(story)}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}


      {/* Full view modal */}
      {selectedStory && (
        <div className="full-view">
          <div className="full-image">
            <img src={selectedStory.img} alt="" />
            <button className="delete-button" onClick={() => deleteStory(selectedStory.id)}>Delete Photo</button>
          </div>
          <button className="close-button" onClick={closeFullView}>×</button>
        </div>
      )}
    </div>
  );
};

export default Stories;
