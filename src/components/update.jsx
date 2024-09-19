import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
const Update = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        description: '',
        category: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
const id =useParams().id
const handleSubmitUp = async (e) => {
    
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/updateoffer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Offer updated');
        setFormData({
          name: '',
          price: '',
          image: '',
          description: '',
          category: ''
        });
      } else {
        alert('Failed to update offer');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating offer');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmitUp}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Offer</button>
    </form>
  );
};


export default Update
