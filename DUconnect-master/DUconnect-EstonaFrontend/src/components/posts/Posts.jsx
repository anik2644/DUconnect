import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch("http://127.0.0.1:8000/GetPost/", {
      fetch("http://127.0.0.1:8000/getpost/", {
      method: "GET", // Change method to GET
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(postforbackend),
      //  mode: 'no-cors',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        console.log("mhd mahmud anik");
         console.log(JSON.stringify(data, null, 2));
         setPosts(data);
        
          // Print response from the server
        // Optionally, you can perform any actions with the fetched posts data here.
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
