import React, { useEffect, useState } from 'react';
import "../css/home.css";
import { Link } from 'react-router-dom';
// import Service from "./Service";

const Home = () => {
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
    <div className="container">
      <h1>Services</h1>
      {data.map((item) => (
        <div key={item._id} className="card">
          <Link to={`/service/${item._id}`} className="link">
            <img src={item.image} alt={item.name} />
         
            <h2>{item.name}</h2>
            <p>Price: {item.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
