import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('place', place);
    formData.append('image', image);

    try {
      await axios.post('https://crudwithimagserver.onrender.com/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('User created successfully');
      // Clear form fields after successful submission
      setName('');
      setPlace('');
      setImage(null);
      navigate('/view');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create User</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="input"
            placeholder="Enter your place"
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="input"
          />
        </div>
        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;