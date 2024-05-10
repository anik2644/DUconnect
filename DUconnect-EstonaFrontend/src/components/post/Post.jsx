import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(12); // Initial likes count

  const handleLikeClick = async () => {
    // Toggle the liked state
    setLiked((prevLiked) => !prevLiked);
    // Update likes count based on current liked state
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    const reactionData = {
      userId: 'user123', // Replace with actual userId
      postId: post['id'], // Replace with actual postId
      time: new Date().toISOString(), // Current time in ISO format
    };
  
    try {
      // Send a POST request to your backend
      const response = await fetch('http://localhost:8001/Like/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reactionData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2)); // Log the full response
        console.log('Reaction saved successfully:', data);

      } else {
        console.error('Failed to save reaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }


    // try {
    //   // Send a POST request to your backend
    //   const response = await fetch('http://localhost:8001/Like/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(reactionData),
    //   });
  
    //   // Check if the request was successful
    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(JSON.stringify(data, null, 2)); // Log the full response
    //     console.log('Reaction saved successfully:', data);

    //   } else {
    //     console.error('Failed to save reaction:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }

  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLikeClick}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {likesCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;