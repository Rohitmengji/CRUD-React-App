import React, { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");
  const [usersList, setUsersList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() !== "") {
      setUsersList([...usersList, name]);
      setName("");
    }
  };

  const handleDelete = (index) => {
    const updatedList = [...usersList];
    updatedList.splice(index, 1);
    setUsersList(updatedList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter a name'
        />
        <button type='submit'>Submit</button>
      </form>
      <div>
        {usersList.length > 0 ? (
          <ul>
            {usersList.map((name, index) => (
              <li key={index}>
                {name}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No names submitted yet.</p>
        )}
        {console.log(usersList)}
      </div>
    </div>
  );
}

export default NameForm;
