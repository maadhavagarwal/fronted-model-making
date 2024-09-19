import React, { useState } from 'react'
import { useEffect } from 'react';
// useEffect
const Staff = () => {
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
      const [bbtn3,setBbtn3]=useState(false);
  return (
    <div className='container'>
    <div className='right'>
      <button className='bttn' onClick={()=>setBbtn3(true)}>Approve Service</button>
 
      {bbtn3 && <Approvee />}
    </div>
    <div className='main'>
      <h1>Profile</h1>
      <h2>Name: John Doe</h2>
      <h3>Email: Amaadh@gmail.com</h3>
    </div>
  </div>

  )
}

export default Staff
