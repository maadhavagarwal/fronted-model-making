import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Signup() {
  let navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [staff, setStaff] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isAdminRole, setIsAdminRole] = useState(false);

  const generateId = () => {
    const range = '0123456789';
    const id = Array.from({ length: 8 }, () => range[Math.floor(Math.random() * range.length)]).join('');
    return id;
  };

  const submithandler = async (e) => {
    e.preventDefault();
    setMessage(`${fname},${lname},${email},${pass1},${pass2},${mobile}`);
    if (pass1 !== pass2) {
      setMessage("password is not matching");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fname + " " + lname,
          email: email,
          password: pass1,
          mobile: mobile,
          isAdmin: isAdmin,
          staff: staff,
        }),
      });

      const jsn = await response.json();
      if (!jsn.success) {
        setMessage(jsn.error || "Signup failed");
      } else {
        localStorage.setItem("token", jsn.token);
        localStorage.setItem("name", jsn.name);
        localStorage.setItem("isAdmin", jsn.isAdmin);
        localStorage.setItem("staff", jsn.staff);
        localStorage.setItem("id", jsn.id);
      
        navigate("/");
      }
    } catch (error) {
      setMessage("Something went wrong");
      console.log(error);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setIsAdminRole(selectedRole === "Admin");
    setIsStaff(selectedRole === "Staff");
    setIsUser(selectedRole === "User");

    if (selectedRole === "Staff") {
      setStaff(generateId());
    } else if (selectedRole === "Admin") {
      setIsAdmin(generateId());
    } else {
      setStaff("");
      setIsAdmin("");
    }
  };

  return (
    <div className="signup">
      <form onSubmit={submithandler}>
        <h1 className="text-centre">Signup</h1>
        <i className="fa-regular fa-user"></i>
        <div>
          <label className="label">First name</label>
          <input
            name="fname"
            type="text"
            placeholder="Enter your first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            className="input"
          />
        </div>

        <div>
          <label className="label">Last name</label>
          <input
            name="lname"
            type="text"
            placeholder="Enter your last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
            className="input"
          />
        </div>

        <i className="fa-regular fa-envelope"></i>
        <div>
          <label className="label">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <i className="fa-solid fa-lock"></i>
        <div>
          <label className="label">Password</label>
          <input
            name="pass1"
            type="password"
            placeholder="Enter your password"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
            required
            className="input"
          />
        </div>

        <i className="fa-regular fa-lock"></i>
        <div>
          <label className="label">Confirm password</label>
          <input
            name="pass2"
            type="password"
            placeholder="Password"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            required
            className="input"
          />
        </div>

        <i className="fa-solid fa-mobile"></i>
        <div>
          <label className="label">Mobile Number</label>
          <input
            name="mobile"
            type="tel"
            placeholder="Enter your Mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="input"
          />
        </div>
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

        <div className="mb-3">
          <input type="checkbox" required className="checks" />
          <label className="label">Agree to terms and conditions</label>
        </div>

        <button type="submit" className="FormButton btn btn-success mt-3">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
