import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
// import Header from '../header'
import "../css/login.css"

function Login() {
  let navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(''); // Changed to boolean 69730031
  const [staff, setStaff] = useState(''); // Added staff state
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isAdminRole, setIsAdminRole] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pass1,
          staff: staff, // Include staff in the request body
          isAdmin: isAdmin, // Include isAdmin in the request body
        }),
      });

      const jsonData = await response.json();
      console.log(jsonData);
      if (!jsonData.success) {
        setMessage(jsonData.error);
      } else {
        localStorage.setItem("token", jsonData.token);
        localStorage.setItem("name", jsonData.name);
        localStorage.setItem("success", jsonData.success);
        localStorage.setItem("isAdmin", jsonData.isAdmin);   
        localStorage.setItem("staff", jsonData.staff); // Store staff in local storage
        alert("Login Success");
        setMessage("Login Success");
        navigate("/");
        setEmail("");
        setPass1("");
      }
    } catch (error) {
      setMessage(error.message);
    }

  };
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setIsAdminRole(selectedRole === "Admin");
    setIsStaff(selectedRole === "Staff");
    setIsUser(selectedRole === "User");
  };

  return (
    <>
      {/* <Header/> */}
      <div className='login'>
        <FormContainer>
          <Form onSubmit={submitHandler}>
            <h1 className='text-centre'>Login</h1>
            {/* <i className="fa-regular fa-envelope"></i> */}
            <Form.Group>
              <Form.Label className='label'>Email</Form.Label>
              <Form.Control
                name="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='input'
              ></Form.Control>
            </Form.Group>
            {/* <i className="fa fa-lock" ></i> */}
            <Form.Group>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control
                name="Pass1"
                type="password" // Changed to password type
                placeholder="Password"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
                required
                className='input'
              ></Form.Control>
            </Form.Group>
            <select className="input" onChange={handleRoleChange}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
          <option value="User">User</option>
        </select>
        {isAdminRole && (
          <div>
            <label htmlFor="isAdmin" className="label">
              Your ID
            </label>
            <input
              type="text"
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
              id="isAdmin"
              className="input"
            />
          </div>
        )}
        {isStaff && (
          <div>
            <label htmlFor="staff" className="label">
              Your ID
            </label>
            <input
              type="text"
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
              id="staff"
              className="input"
            />
          </div>
        )}

            <Button type='submit' className='FormButton mt-3'>Login</Button>
          </Form>
        </FormContainer>
      </div>
    </>
  )
}

export default Login;
