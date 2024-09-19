import React, { useEffect, useState } from 'react';
import '../css/admin.css';
import { Link, useParams } from 'react-router-dom';

// DeleteOffer component
const DeleteOffer = ({ offerId }) => {
  const handleDelete = async () => {
    try { 
      const response = await fetch(`http://localhost:8000/deleteoffer/${offerId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Offer deleted');
        // Refresh the data (trigger a parent component refresh)
      } else {
        alert('Failed to delete offer');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting offer');
    }
  };

  return (
    <button onClick={handleDelete}>Delete Offer</button>
  );
};

// OfferForm component
const OfferForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/addoffer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Offer saved');
        setFormData({
          name: '',
          price: '',
          image: '',
          description: '',
          category: ''
        });
      } else {
        alert('Failed to save offer');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving offer');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <button type="submit">Save Offer</button>
    </form>
  );
};

// OfferFormup component
const OfferFormup = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getoffer/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const offer = await response.json();
        setFormData(offer);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Offer updated');
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

// Datainfo component
const Datainfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getdata = async () => {
    try {
      const response = await fetch('http://localhost:8000/getoffer');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Services</h1>
      {data.map((item) => (
        <div key={item._id} className='card'>
          <DeleteOffer offerId={item._id} />
          <h2>{item.name}</h2>
          <p>Price: {item.price}</p>
          <img src={item.image} alt={item.name} />
        </div>
      ))}
    </div>
  );
};

// DataInfoup component
const DataInfoup = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getdataup = async () => {
    try {
      const response = await fetch('http://localhost:8000/getoffer');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdataup();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Update Services</h1>
      {data.map((item) => (
        <div key={item._id} className='card'>
          <Link to={`/update/${item._id}`}>Update Offer</Link>
          <h2>{item.name}</h2>
          <p>Price: {item.price}</p>
          <img src={item.image} alt={item.name} />
        </div>
      ))}
    </div>
  );
};

// Approvee component
const Approvee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getapplication');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/approve/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: true })
      });

      if (response.ok) {
        alert('Service approved');
        fetchData(); // Refresh the data after approval
      } else {
        alert('Failed to approve service');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error approving service');
    }
  };

  return (
    <div>
      <h1>Approve Service</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Adhar Info</th>
            <th>Address</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            !item.status?(
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.service}</td>
              <td>{item.adhar}</td>
              <td>{item.address}</td>
              <td><button onClick={() => handleApprove(item._id)}>Approve</button></td>
            </tr>
            ):null
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Profile component
const Profile = () => {
  const [bttn, setBttn] = useState(false);
  const [bttn1, setBttn1] = useState(false);
  const [bttn2, setbttn2] = useState(false);
  const [bttn3, setbttn3] = useState(false);

  const show = () => {
    setBttn(false);
    setBttn1(true);
    setbttn2(false);
    setbttn3(false);
  };

  const deete = () => {
    setBttn(false);
    setBttn1(false);
    setbttn2(true);
    setbttn3(false);
  };

  const hide = () => {
    setBttn1(false);
    setbttn2(false);
    setBttn(true);
    setbttn3(false);
  };

  const aap = () => {
    setbttn3(true);
    setBttn1(false);
    setbttn2(false);
    setBttn(false);
  }

  return (
    <div className='container'>
      <div className='right'>
        <button className='bttn' onClick={hide}>Add Service</button>
        <button className='bttn' onClick={show}>Update Service</button>
        <button className='bttn' onClick={deete}>Delete Service</button>
        <button className='bttn' onClick={aap}>Approve Service</button>
        {bttn && <OfferForm />}
        {bttn1 && <DataInfoup />}
        {bttn2 && <Datainfo />}
        {bttn3 && <Approvee />}
      </div>
      <div className='main'>
        <h1>Profile</h1>
        <h2>Name: John Doe</h2>
        <h3>Email: Amaadh@gmail.com</h3>
      </div>
    </div>
  );
};

export default Profile;
