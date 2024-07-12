import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import './UserTable.css'; // Import the CSS file for styling

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('https://crudwithimagserver.onrender.com/getuser');
        setUsers(response.data); // Set the users state with the fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after mounting

  return (
    <div className="user-table-container">
      <h2 className="title">User Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th className="header-cell">Name</th>
            <th className="header-cell">Place</th>
            <th className="header-cell">Image</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="table-row">
              <td className="table-cell">{user.name}</td>
              <td className="table-cell">{user.place}</td>
              <td className="table-cell">
                <img
                  src={`https://crudwithimagserver.onrender.com/images/${user.image}`}
                  alt={user.name}
                  style={{ maxWidth: '100px', borderRadius: '10px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;