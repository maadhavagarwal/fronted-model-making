import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/application.css'; // Ensure this path is correct

function ApplicationForm() {
  let navigate = useNavigate();
  const id = useParams().id;
  const [formData, setFormData] = useState({
    user: localStorage.getItem('id'),
    image: "",
    name: "",
    email: "",
    phone: "",
    adhar: "",
    address: "",
    price: "",
    paymentid: "",
    course: id
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user: formData.user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          adhar: formData.adhar,
          address: formData.address,
          price: formData.price,
          paymentid: formData.paymentid,
          course: formData.course,
        }),
      });
      if (response.ok) {
        alert("Application submitted successfully");
        navigate("/");
      } else {
        setMessage("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Application Form</h1>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Adhar</label>
          <input
            type="text"
            name="adhar"
            value={formData.adhar}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

       

        <div className="form-group">
          <label>Payment ID</label>
          <input
            type="text"
            name="paymentid"
            value={formData.paymentid}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}

export default ApplicationForm;
