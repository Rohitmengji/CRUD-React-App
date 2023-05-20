import React, { useState, useEffect } from "react";
import axios from "axios";

function UserPosts({ userId }) {
  // Initialize state variables for posts, search term, expand state, and new comment
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Fetch user's posts on mount or when user ID changes
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  // Handle changes to search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle creating a new comment
  const handleCreateComment = (postId) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/comments`, {
        postId: postId,
        body: newComment,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle updating a post
  const handleUpdatePost = (postId, newTitle, newBody) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        id: postId,
        userId: userId,
        title: newTitle,
        body: newBody,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle deleting a post
  const handleDeletePost = (postId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Render the user's posts
  return (
    <div>
      <h3>
        User Posts{" "}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </button>
      </h3>
      {expanded && (
        <div>
          <input type='text' value={searchTerm} onChange={handleSearch} />
          <button>Create Comment</button>
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <div key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <button onClick={() => handleCreateComment(post.id)}>
                  Create Comment
                </button>
                <button
                  onClick={() => {
                    handleUpdatePost(post.id, "New Title", "New Body");
                  }}
                >
                  Update Post
                </button>
                <button onClick={() => handleDeletePost(post.id)}>
                  Delete Post
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default UserPosts;
