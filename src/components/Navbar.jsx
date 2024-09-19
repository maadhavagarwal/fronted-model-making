import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import "../css/nav.css"
const Navbar1 = () => {
  return (
    <div className='Navbar'> 
        
     <h2 className='header'> <Link to="/">Garam Panchayat</Link> </h2>
     <h5 className='home'><Link to="/">Home </Link></h5>
     {localStorage.getItem("token") ? <button className='home' onClick={() => localStorage.removeItem("token")}>Logout</button> :<><h5 className='home'><Link to="/login">Login</Link></h5><h5 className='home'><Link to="/signup">Signup</Link></h5></>  }
    }
    
     {/* <h5 className='home'><Link to="/login">Login</Link></h5>
     <h5 className='home'><Link to="/signup">Signup</Link></h5> */}
     <h5 className='home'><Link to="/application">Service</Link></h5>

     
     {/* <h5 className='order'>Order</h5> */}
     {/* <h5 className='home'><Link to="/profile">Profile</Link></h5> */}
    {localStorage.getItem("isAdmin")? <h5 className='home'><Link to="/admin">Admin</Link></h5>:
     <h5 className='home'><Link to="/profile">Profile</Link></h5>
    }
    {localStorage.getItem("staff")? <h5 className='home'><Link to="/staff">Staff</Link></h5>:
    //  <h5 className='home'><Link to="/profile">Profile</Link></h5> 
    null
    }
    </div>
  )
}

export default Navbar1
