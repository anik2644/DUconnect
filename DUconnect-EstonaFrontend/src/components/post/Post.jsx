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
    const reactionData = {
      userId: 'user123', // Replace with actual userId
      postId: post.id, // Replace with actual postId
      time: new Date().toISOString(), // Current time in ISO format
    };
  
    try {
      const url = liked ? `http://localhost:8001/Unlike/?postId=${post.id}` : 'http://localhost:8001/Like/';
      const method = liked ? 'DELETE' : 'POST';
  
      // Send the request to your backend
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reactionData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2)); // Log the full response
  
        // Update likes count locally if successful
        setLikesCount(prevCount => liked ? prevCount - 1 : prevCount + 1);
        setLiked(!liked); // Toggle liked state
      } else {
        console.error(liked ? 'Failed to remove like' : 'Failed to save like', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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