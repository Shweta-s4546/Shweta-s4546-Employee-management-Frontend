import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/logout');
      alert(response.data.message);
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className='container-fluid'>
    <div className="row">
      {/* <div className="col-md-12 text-center">
        <h6 className="display-6 text-success">Dashboard</h6>
      </div> */}
    </div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav me-auto mb-2  text-uppercase mb-lg-0">
        <li className="nav-item">
            <Link className="nav-link  text-dark" to="/dashboard">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  text-dark" to="/employees">Employees List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  text-dark" to="/add-employee">Create Employee</Link>
          </li>
        </ul>
        <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
    <div className="row">
      <div className="col-md-12 text-center">
        <h6 className="display-4 text-uppercase  text-success mt-5">Welcome to admin panel</h6>
      </div>
    </div>
  </div>
  );
}

export default Dashboard;