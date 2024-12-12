import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaUsers, FaStore,  FaUser } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/logo.png" alt="LOGO" className="logo" />
      </div>
      <h2 className="logos">Stamp Quest</h2>
      <ul className="nav-links">
      <li>
          <Link to="/">
            <FaUser /> Login
          </Link>
        </li>
        <li>
          <Link to="/home">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/About">
            <FaInfoCircle /> About
          </Link>
        </li>
        <li>
          <Link to="/Community">
            <FaUsers /> Community
          </Link>
        </li>
        <li>
          <Link to="/Marketplace">
            <FaStore /> Marketplace
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
