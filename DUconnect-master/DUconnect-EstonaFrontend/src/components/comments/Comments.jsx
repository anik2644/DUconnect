import React, { useState, useEffect, useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    // Initial comments (temporary)
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://i.ibb.co/M134wzq/csed.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      timestamp: Date.now() - 1000 * 60 * 10, // 10 minutes ago (temporary)
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://i.ibb.co/M134wzq/csed.jpg?auto=compress&cs=tinysrgb&w=1600",
      timestamp: Date.now() - 1000 * 60 * 20, // 20 minutes ago (temporary)
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 60 * 1000); // Update time every minute
    return () => clearInterval(intervalId);
  }, []); // Run only on component mount

  const updateTime = () => {
    setComments((prevComments) =>
      prevComments.map((comment) => ({
        ...comment,
        timestamp: comment.timestamp + 60 * 1000, // Update timestamp every minute
      }))
    );
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: comments.length + 1,
        desc: newComment,
        name: currentUser.name,
        userId: currentUser.id,
        profilePicture: currentUser.profilePic,
        timestamp: Date.now(),
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  const getTimeDifference = (timestamp) => {
    const now = Date.now();
    const difference = now - timestamp;

    if (difference < 60 * 1000) {
      return "Just now";
    } else if (difference < 60 * 60 * 1000) {
      const minutes = Math.floor(difference / (60 * 1000));
      return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
    } else if (difference < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(difference / (60 * 60 * 1000));
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(difference / (24 * 60 * 60 * 1000));
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{getTimeDifference(comment.timestamp)}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
