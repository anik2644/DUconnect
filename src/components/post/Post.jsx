import React, { useState } from "react";
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";

const Post = ({ post, onDelete }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(12); // Initial likes count
  const [optionsOpen, setOptionsOpen] = useState(false);

  const handleLikeClick = () => {
    // Toggle the liked state
    setLiked((prevLiked) => !prevLiked);
    // Update likes count based on current liked state
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const handleDelete = () => {
    onDelete(post.id); // Call onDelete with the post id to delete the post
  };

  const handleShare = () => {
    // Open share dialog or implement your custom share functionality here
    alert("Share functionality will be implemented here!");
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <div className="more-options">
            <MoreHorizIcon
              className="more-icon"
              onClick={() => setOptionsOpen(!optionsOpen)}
            />
            {optionsOpen && (
              <div className="options">
                <div className="option" onClick={handleDelete}>
                  Delete
                </div>
                {/* Add more options here */}
              </div>
            )}
          </div>
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
          <div className="item" onClick={handleShare}>
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
