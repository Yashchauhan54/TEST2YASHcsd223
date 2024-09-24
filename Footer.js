import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer bg-black" >
      
      <div className="container  py-2" >
        <div className="row">
        <div className="col-md-4 text-start">
          <h2>Find a branch or ATM</h2>
        <form className="d-flex mb-3" style={{ width: '350px', height:'40px',marginTop:'15px'}} >
            <input className="form-control me-2" type="search" placeholder="Enter address or postal code" aria-label="Search" />
            <button className="btn btn-outline-light1" type="submit"></button>
          </form>
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link className="text-white" to="/faq">FAQ</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/careers">Careers</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/legal">Legal</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/">Home</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/media center">Media center</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/Insurance">Insurance</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/Feedback">Feedback</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/Lendings">Lendings</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/Markets">Markets</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/settings">Settings</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/About">About</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8 text-center ">
            <p style={{fontSize:'30px',textDecoration:'underline'}}>Contact Us</p>
            
            <p>Email: info@yourbank.com</p>
            <p>Ph.No.: 000 111 2222</p>
            <p>&copy; 2024 Your Bank. All rights reserved.</p>
            
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
