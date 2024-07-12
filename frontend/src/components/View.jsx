import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:6500/getuser');
        setUsers(response.data); // Set the users state with the fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after mounting

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.place}</td>
              <td><img src={`http://localhost:6500/images/${user.image}`} alt={user.name} style={{ maxWidth: '100px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
