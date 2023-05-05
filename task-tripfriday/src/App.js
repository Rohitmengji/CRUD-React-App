import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import UserList from "./Crud/UserList";
import UserDetails from "./Crud/UserDetails";

/*
The application uses the following components:

App: This is the main component that sets up the routing and provides the user data to child components via a context provider.
UserList: This component displays a list of all the users fetched from the JSONPlaceholder API. It uses the useContext hook to access the user data from the UserContext, and the Link component from the react-router-dom library to link to each user's detail page.
UserDetails: This component displays the details of a single user, including their posts and albums. It uses the useParams and useNavigate hooks from react-router-dom to access the user's ID and navigate back to the user list, respectively. It also uses useState hooks to manage the state of various components, such as the selected album photo, edited post, and new post. The component provides functionality to add, edit, and delete posts.
The application fetches data from the JSONPlaceholder API using the axios library and the useEffect hook. It also uses the useContext hook to pass data down to child components via the UserContext.Provider component.
*/

// Create a context to pass the users data down to child components
export const UserContext = createContext();

const App = () => {
  // Initialize a state variable to hold the list of users
  const [users, setUsers] = useState([]);

  // Fetch the list of users from the API using useEffect hook and Axios
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // Provide the users data to child components via the UserContext.Provider component
    <UserContext.Provider value={users}>
      <Routes>
        {/* Render the UserList component when the root path is accessed */}
        <Route path='/' element={<UserList />} />
        {/* Render the UserDetails component when the /users/:id path is accessed */}
        <Route path='/users/:id' element={<UserDetails />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
