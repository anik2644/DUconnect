import React, { useState } from "react";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Anik",
      userId: 1,
      profilePic:
        "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "Eesor",
      userId: 1,
      profilePic:
        "https://i.ibb.co/ggyKMj3/279725233-1949964898521765-5705253541412336116-n.jpg",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://i.ibb.co/ggyKMj3/279725233-1949964898521765-5705253541412336116-n.jpg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      name: "Anik",
      userId: 2,
      profilePic:
        "https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
  ]);

  // Function to add a new post
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
