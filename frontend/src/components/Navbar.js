import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {
  const [cartView, setCartView]= useState(false)

  const navigate= useNavigate();
  const handleLogout= ()=>{
    localStorage.removeItem("authToken")
    navigate("/login");
  }
  const data = useCart();
  const authToken = localStorage.getItem("authToken");
  console.log("authToken", authToken);
  
  const decodedToken = authToken ? JSON.parse(atob(authToken.split('.')[1])) : null;
  console.log("decodedToken", decodedToken);
  
  const isAdmin = decodedToken && decodedToken.isAdmin !== undefined ? decodedToken.isAdmin : false;
  console.log("isAdmin", isAdmin);
  
  
  
  


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Food Hunters</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              {/* <li className="nav-item">
                <Link className="nav-link text-white active fs-5" aria-current="page" to="/">Home</Link>
              </li> */}

              {isAdmin ? (
                
                <li className="nav-item d-flex">
                   <Link className="nav-link text-white active fs-5 d-inline" aria-current="page" to="/" >Admin Dashboard</Link>
                  <Link className="nav-link text-white active fs-5 d-inline" aria-current="page" to="/myOrder">Customer Orders</Link>
                 
                </li>
              ) : ( 
                <li className="nav-item d-flex">
                   <Link className="nav-link text-white active fs-5 d-inline" aria-current="page" to="/">Home</Link>
                  <Link className="nav-link text-white active fs-5 d-inline" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>
            {!authToken ? (
              <div className='d-flex'>
                <Link className="btn bg-white text-info mx-1" to="/login">LogIn</Link>
                <Link className="btn bg-white text-info mx-1" to="/CreateUser">Signup</Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-info mx-1" onClick={() => setCartView(true)}>
                  My Cart{" "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>Log Out</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
