import { useContext } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"

const Stories = () => {

  const {currentUser} = useContext(AuthContext)

  //TEMPORARY
  const stories = [
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
  ];

  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories