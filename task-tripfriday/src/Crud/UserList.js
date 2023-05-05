import { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

/* This code exports a UserList component that uses useContext hook to access the users array from UserContext provided by the App component. It then maps over the users array and renders a Link for each user that directs to the UserDetails component with the user's id as a parameter. Additionally, it renders a tooltip popup for each user on hover that shows the user's username and email.*/

function UserList() {
  const users = useContext(UserContext);
  const [hoveredUser, setHoveredUser] = useState(null);

  const handleMouseEnter = (user) => {
    setHoveredUser(user);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  return (
    <div className=' mt-5 container border'>
      <h1>User List</h1>
      <hr />
      {users.map((user) => (
        <Link
          to={`/users/${user.id}`}
          key={user.id}
          className='position-relative text-decoration-none'
        >
          <div
            className='user-tooltip'
            onMouseEnter={() => handleMouseEnter(user)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <p className=''>{user.name}</p>
          </div>
          {hoveredUser && hoveredUser.id === user.id && (
            <div
              className='user-popup position-absolute bg-light'
              style={{
                top: "100%",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            >
              <p className='user-popup-name'>{hoveredUser.username}</p>
              <p className='user-popup-email'>{hoveredUser.email}</p>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default UserList;