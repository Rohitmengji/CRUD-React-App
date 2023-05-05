import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* This is a React component that displays the details of a user, along with their posts and albums fetched from the JSONPlaceholder API. It also allows users to add, edit, and delete posts.

The UserDetail component fetches the user's details, posts, and albums from the API using axios and useEffect. It uses useState to manage the component's state, including the selected album photo, the edited post, and the new post. The component renders a div that displays the user's details and a list of their posts and albums.

The component provides functionality to edit and delete posts using the handleEditPost and handleDeletePost functions, respectively. It also allows users to add new posts using the handleNewPost function.

The component renders an input and a textarea element that allow users to input a new post's title and body, respectively. Once a user clicks the "Add Post" button, the component sends a POST request to the API to create a new post, and then updates the state of the posts array to include the new post.

Overall, this component provides a comprehensive view of a user's details, posts, and albums, and allows users to perform basic CRUD operations on their posts. */

function UserDetail() {
  // get the id parameter from the URL using useParams
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: "", body: "" });
  const [selectedAlbumPhoto, setSelectedAlbumPhoto] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  // navigate back to the userList
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      console.log(selectedAlbumPhoto, "selected");
      try {
        //Destructure the response data directly in the Promise.all callback function to avoid having to call ".data" on each response object:
        const [userResponse, postsResponse, albumsResponse] = await Promise.all(
          [
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
            axios.get(
              `https://jsonplaceholder.typicode.com/posts?userId=${id}`
            ),
            axios.get(
              `https://jsonplaceholder.typicode.com/albums/${id}/photos`
            ),
          ]
        );
        // set the response data to the state variables
        setUser(userResponse.data);
        setPosts(postsResponse.data);
        setAlbums(albumsResponse.data);
      } catch (error) {
        // Use a catch block instead of a try-catch statement to handle errors:
        console.log(error);
      }
    };
    // Call the function inside useEffect to fetch data based on the id parameter
    fetchUserDetail();
  }, [id, selectedAlbumPhoto]);

  //  Navigate back to the user list component
  const handleGoBack = () => {
    navigate("/");
  };

  // Handle editing of post by setting the editedPost state and editPostId state
  const handleEditPost = (postId) => {
    setEditPostId(postId);
    setEditedPost(posts.find((post) => post.id === postId));
  };

  // Handle saving of edited post by updating the posts array state
  const handleSavePost = () => {
    const updatedPosts = posts.map((post) =>
      post.id === editPostId ? { ...post, ...editedPost } : post
    );
    setPosts(updatedPosts);
    setEditPostId(null);
  };

  // Handle deleting of post by making a DELETE request to the API and updating the posts array state
  const handleDeletePost = (postId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        const filteredPosts = posts.filter((post) => post.id !== postId);
        setPosts(filteredPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Render the user detail component
  return (
    <div className='container' style={{ marginTop: "50px" }}>
      <nav>
        <button className='btn btn-secondary mb-2 ' onClick={handleGoBack}>
          Back
        </button>
      </nav>
      <div className='row'>
        <div className='col-md-3 bg-light p-4'>
          <h2 className='my-4'>User Detail</h2>
          <div className='my-4'>
            <h3 className='mb-3'>Name : {user?.name}</h3>
            <p className='mb-1'>Email : {user?.email}</p>
            <p className='mb-1'>Phone Number: {user?.phone}</p>
            <p className='mb-1'>Address : {user?.address["street"]}</p>
            <p className='mb-1'>Website : {user?.website}</p>
          </div>
        </div>

        <div
          className='col-md-9 p-4'
          style={{ overflowY: "scroll", height: "80vh" }}
        >
          {/* whenever user want to add new post manually  */}
          <div>
            <h2 className='my-4'>Add New Post</h2>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter post title'
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({
                    ...newPost,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className='mb-3'>
              <textarea
                className='form-control'
                placeholder='Enter post body'
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({
                    ...newPost,
                    body: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <button
              className='btn btn-primary'
              onClick={() => {
                // Check if both title and body are not empty
                if (newPost.title.trim() !== "" && newPost.body.trim() !== "") {
                  // Send a POST request to the API endpoint to create a new post with the data in newPost
                  axios
                    .post("https://jsonplaceholder.typicode.com/posts", newPost)
                    .then((response) => {
                      // If the request is successful, update the posts state with the new post data
                      setPosts([...posts, response.data]);
                      // Reset the newPost state to clear the input fields
                      setNewPost({ title: "", body: "" });
                    })
                    .catch((error) => {
                      // Reset the newPost state to clear the input fields

                      console.log(error);
                    });
                }
              }}
            >
              Add Post
            </button>
          </div>

          {/* shows all posts */}

          <div>
            <h2 className='my-4'>Posts</h2>
            <div>
              {posts
                .slice()
                .reverse()
                .map((post) => (
                  <div key={post.id}>
                    {editPostId === post.id ? (
                      <div>
                        <div className='mb-3'>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Enter post title'
                            value={editedPost.title}
                            onChange={(e) =>
                              setEditedPost({
                                ...editedPost,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='mb-3'>
                          <textarea
                            className='form-control'
                            placeholder='Enter post body'
                            value={editedPost.body}
                            onChange={(e) =>
                              setEditedPost({
                                ...editedPost,
                                body: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                        <button
                          className='btn btn-success me-2'
                          onClick={handleSavePost}
                        >
                          Save
                        </button>
                        <button
                          className='btn btn-danger'
                          onClick={() => setEditPostId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h3 className='mb-3'>{post.title}</h3>
                        <p>{post.body}</p>
                        <div>
                          <button
                            className='btn btn-primary me-2'
                            onClick={() => handleEditPost(post.id)}
                          >
                            Edit
                          </button>
                          <button
                            className='btn btn-danger'
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                    <hr />
                  </div>
                ))}
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              <div
                className='col-md-6'
                style={{ height: "500px", overflow: "auto" }}
              >
                <h2 className='my-4'>Albums</h2>
                <div className='album-list'>
                  {albums.map((album) => (
                    <div className='album-box' key={album.id}>
                      <div
                        className='card'
                        style={{ cursor: "pointer", marginBottom: "10px" }}
                        onClick={() => {
                          setSelectedAlbumPhoto(album);
                        }}
                      >
                        <div
                          className='card-body'
                          style={{ display: " flex " }}
                        >
                          <img
                            src={album.thumbnailUrl}
                            alt='album thumbnailUrl'
                            style={{
                              height: "50px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                          <h5 className='card-title'>{album.title}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='col-md-6 d-flex justify-content-end'>
                {selectedAlbumPhoto && (
                  <div className='my-4'>
                    <div className='photo-display'>
                      <div className='photo-box' key={selectedAlbumPhoto.id}>
                        <div className='card'>
                          <img
                            src={selectedAlbumPhoto.url}
                            className='card-img-top'
                            alt={selectedAlbumPhoto.title}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;

/* about this component 
This is a React component that displays the details of a user, along with their posts and albums fetched from the JSONPlaceholder API. It also allows users to add, edit, and delete posts.

The component uses several hooks provided by the React library, including useParams, useEffect, useState, and useNavigate. useParams extracts the id parameter from the URL, useEffect is used to fetch the user details, posts, and albums from the API and update the component state, useState is used to manage the state of various variables in the component, and useNavigate is used to navigate back to the homepage.

The component fetches the user's details, posts, and albums from the API using axios and useEffect. It then uses useState to manage the component's state, including the selected album photo, the edited post, and the new post. The component renders a div that displays the user's details and a list of their posts and albums.

The component provides functionality to edit and delete posts using the handleEditPost and handleDeletePost functions, respectively. It also allows users to add new posts using the handleNewPost function.

The component renders an input and a textarea element that allow users to input a new post's title and body, respectively. Once a user clicks the "Add Post" button, the component sends a POST request to the API to create a new post and then updates the state of the posts array to include the new post. */
