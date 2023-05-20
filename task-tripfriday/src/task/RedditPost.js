import React, { useEffect, useState } from "react";

const RedditPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://www.reddit.com/r/reactjs.json")
      .then((response) => response.json())
      .then((data) => {
        const postItems = data.data.children.map((post) => ({
          title: post.data.title,
          selftext_html: post.data.selftext_html,
          score: post.data.score,
          url: post.data.url,
        }));

        // Sort the posts based on the score in descending order
        postItems.sort((a, b) => a.score - b.score);

        setPosts(postItems);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {posts.map((post, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            margin: "10px",
            padding: "20px",
            width: "350px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
              overflow: "hidden",
              maxHeight: "3.6em",
              lineHeight: "1.2em",
            }}
          >
            {post.title}
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#888",
              marginBottom: "10px",
            }}
          >
            Score: {post.score}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#555",
              marginBottom: "15px",
              padding: "7px",
              maxHeight: "180px",
              overflow: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: post.selftext_html }}
          ></div>
          <a
            style={{
              fontSize: "14px",
              color: "#007bff",
              textDecoration: "none",
            }}
            href={post.url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default RedditPosts;
