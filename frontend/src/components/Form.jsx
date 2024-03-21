import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const UserForm = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState(null);
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('place', place);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:6500/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('User created successfully');
      // Clear form fields after successful submission
      setName('');
      setPlace('');
      setImage(null);
      navigate('/view')
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Place:</label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
