import React, { useEffect, useState } from 'react';
import '../css/Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [data, setData] = useState([]);
  const [bttn, setBttn] = useState(false);
  const [data1,setData1] = useState([]);
  const getdata = async () => {
    try {
      const response = await fetch('http://localhost:8000/getoffer');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData1(jsonData);
    } catch (error) {
      // setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

 const id =localStorage.getItem('id');
  useEffect(() => {
    fetch('http://localhost:8000/getapplication')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className='container'>
      <div className='left'>
        {/* Add left content here if needed */}
      
      {/* <div className='right'> */}
        <button className='bttn' onClick={() => setBttn(true)}>Check Status</button>
        <button className='bttn' onClick={()=>setBttn(false)}>Delete Account</button>
      {/* </div> */}
      </div>
      <div className='main'>
        {bttn ? (
          <div className='card-container'>
            {data.map(item => (
              item.user == id?(

              <div key={item._id} className={`card ${item.status ? 'card--green' : 'card--grey'}`}>
              <p>Email: {item.email}</p>
                <p>Phone: {item.phone}</p>
                <p>Adhar: {item.adhar}</p>
                
                <p>Status: {item.status ? 'Approved' : 'Pending'}</p>
                <h2>{item.name}</h2>
                {data1.map(item1 => (
                  item1._id == item.course?(<div>
                    <p>Service  Name: {item1.name}</p>
                    </div>
                  ):null
                  ))}
           
              
              </div>
              ):null
            ))}
          </div>
        ) :<> <h1>Profile</h1>
        <h2>Name: John Doe</h2>
        <h3>Email: Amaadh@gmail.com</h3>
        </>}
      </div>
      
</div>
    // </div>
  );
};

export default Profile;
