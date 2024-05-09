// addPost.js
import { useState } from "react";

const AddPost = ({ onAddPost }) => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    const newPost = {
      id: Math.random(),
      name: "Anik", // Assuming the name of the user
      userId: 1, // Assuming the ID of the user
      profilePic: "https://example.com/profile.jpg", // Assuming the profile picture URL of the user
      desc: text,
      img: selectedImage,
      likes: 0,
      comments: [],
    };

    onAddPost(newPost);

    // Clear input fields after sharing
    setText("");
    setSelectedImage(null);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleShare}>Share</button>
    </div>
  );
};

export default AddPost;
