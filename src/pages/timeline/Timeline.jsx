import React, { useEffect, useState } from "react";
import Post from "../components/Post"; // Assuming you already have a Post component

const Timeline = () => {
  // State to store fetched posts
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the backend
  const fetchPosts = () => {
    // Make API request to fetch posts
    // Update the 'posts' state with the fetched posts
    const dummyPosts = [
      // Example data, replace with actual fetched posts
      {
        id: 1,
        name: "John Doe",
        profilePic: "profile.jpg",
        caption: "Hello world!",
        imageUrl: "post-image.jpg",
        likes: 10,
        comments: [
          { id: 1, userId: 2, text: "Great post!" },
          { id: 2, userId: 3, text: "Nice picture!" }
        ]
      },
      // Add more posts as needed
    ];
    setPosts(dummyPosts);
  };

  return (
    <div className="timeline">
      <h1>Timeline</h1>
      {/* Iterate over posts and render each post */}
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Timeline;
